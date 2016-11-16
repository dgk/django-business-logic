# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.utils import timezone
from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import ugettext_lazy as _

from .context import Context
from .log import Execution, ExecutionArgument
from .node import Node
from .variable import VariableDefinition, Variable
from .types_ import DJANGO_FIELDS_FOR_TYPES

from ..config import ExceptionHandlingPolicy
from ..fields import DeepAttributeField


@python_2_unicode_compatible
class ExecutionEnvironment(models.Model):
    title = models.CharField(_('Title'), max_length=255, unique=True)
    description = models.TextField(_('Description'), null=True, blank=True)
    libraries = models.ManyToManyField('FunctionLibrary', related_name='environments', blank=True)
    debug = models.BooleanField(default=False)
    log = models.BooleanField(default=False)
    cache = models.BooleanField(default=True)
    exception_handling_policy = models.CharField(
        _('Exception handling policy'), max_length=15, default=ExceptionHandlingPolicy.INTERRUPT,
        choices=(
            (ExceptionHandlingPolicy.IGNORE, _('Ignore')),
            (ExceptionHandlingPolicy.INTERRUPT, _('Interrupt')),
            (ExceptionHandlingPolicy.RAISE, _('Raise')),
        ))


    def __str__(self):
        return self.title


@python_2_unicode_compatible
class ProgramInterface(models.Model):
    title = models.CharField(_('Title'), max_length=255, db_index=True)
    code = models.SlugField(_('Code'), max_length=255, null=True, blank=True, unique=True, db_index=True)

    environment = models.ForeignKey('ExecutionEnvironment', null=True, blank=True)

    creation_time = models.DateTimeField(auto_now_add=True)
    modification_time = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Program interface')
        verbose_name_plural = _('Program interfaces')

    def __str__(self):
        return self.title


@python_2_unicode_compatible
class ProgramArgument(models.Model):
    program_interface = models.ForeignKey(ProgramInterface, related_name='arguments')
    name = models.SlugField(_('Name'), max_length=255)

    content_type = models.ForeignKey(ContentType)
    variable_definition = models.OneToOneField(VariableDefinition, related_name='program_argument')

    class Meta:
        unique_together = (('program_interface', 'name'),)
        verbose_name = _('Program argument')
        verbose_name_plural = _('Program arguments')

    def __str__(self):
        return self.name

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if not self.id:
            self.variable_definition = VariableDefinition.objects.create(name=self.name)
        elif self.name != self.variable_definition.name:
            self.variable_definition.name = self.name
            self.variable_definition.save()

            for field in self.fields.all():
                field.save()

        super(ProgramArgument, self).save(force_insert, force_update, using, update_fields)

    def delete(self, using=None):
        for field in self.fields.all():
            field.delete()

        self.variable_definition.delete()
        super(ProgramArgument, self).delete(using)


@python_2_unicode_compatible
class ProgramArgumentField(models.Model):
    program_argument = models.ForeignKey(ProgramArgument, related_name='fields')
    name = DeepAttributeField(_('Name'), max_length=255)
    title = models.CharField(_('Title'), max_length=255, null=True, blank=True)
    variable_definition = models.OneToOneField(VariableDefinition, related_name='program_argument_field')

    class Meta:
        unique_together = (('program_argument', 'name'),)
        verbose_name = _('Program argument field')
        verbose_name_plural = _('Program argument fields')
        ordering = ('name', )

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if not self.id:
            self.variable_definition = VariableDefinition.objects.create(name=self.get_variable_name())
        elif self.get_variable_name() != self.variable_definition.name:
            self.variable_definition.name = self.get_variable_name()
            self.variable_definition.save()

        super(ProgramArgumentField, self).save(force_insert, force_update, using, update_fields)

    def __str__(self):
        return self.get_variable_name()

    def get_variable_name(self):
        return '{}.{}'.format(self.program_argument.name, self.name)

    def get_title(self):
        if self.title:
            return self.title

        model = self.program_argument.content_type.model_class()
        titles = [model._meta.verbose_name, ]
        for field_name in self.name.split('.'):
            field = model._meta.get_field(field_name)
            titles.append(field.verbose_name)
            is_django_model = field.__class__ in DJANGO_FIELDS_FOR_TYPES['model']

            if is_django_model:
                model = field.related_model

        return '.'.join(titles)

    def delete(self, using=None,):
        self.variable_definition.delete()
        super(ProgramArgumentField, self).delete(using)


@python_2_unicode_compatible
class Program(models.Model):
    title = models.CharField(_('Title'), max_length=255)
    code = models.SlugField(_('Code'), max_length=255, unique=True, db_index=True)

    program_interface = models.ForeignKey(ProgramInterface)

    environment = models.ForeignKey('ExecutionEnvironment', null=True, blank=True)

    creation_time = models.DateTimeField(auto_now_add=True)
    modification_time = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Program')
        verbose_name_plural = _('Programs')

    def __str__(self):
        return '{}: {}({})'.format(self.program_interface, self.title, self.code)


@python_2_unicode_compatible
class ProgramVersion(models.Model):
    title = models.CharField(_('Title'), max_length=255, null=True, blank=True)
    description = models.TextField(_('Description'), null=True, blank=True)

    is_default = models.BooleanField(_('Is default'), default=False)

    program = models.ForeignKey(Program, related_name='versions')
    entry_point = models.ForeignKey(Node, verbose_name=_('Entry point'))

    environment = models.ForeignKey('ExecutionEnvironment', null=True, blank=True)

    creation_time = models.DateTimeField(auto_now_add=True)
    modification_time = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Program version')
        verbose_name_plural = _('Program versions')

    def __str__(self):
        return self.title

    def copy(self, new_title):
        entry_point = self.entry_point.clone()
        new_version = ProgramVersion.objects.create(title=new_title,
                                                    program=self.program, entry_point=entry_point)
        new_version.save()
        return new_version

    def execute(self, **kwargs):
        context = kwargs.pop('context', Context())
        execution = context.execution = Execution.objects.create(program_version=self) if context.config.debug else None

        for program_argument in self.program.program_interface.arguments.all():
            try:
                argument = kwargs.pop(program_argument.name)
                assert program_argument.content_type.model_class() == argument.__class__
            except (KeyError, AssertionError, AttributeError):
                raise
            context.set_variable(program_argument.variable_definition, argument)

            if context.config.debug:
                ExecutionArgument.objects.create(
                    execution=execution,
                    program_argument=program_argument,
                    content_type=program_argument.content_type,
                    object_id=argument.id
                )

            for field in program_argument.fields.all():
                parts = field.name.split('.')
                current = argument
                found = True
                for part in parts:
                    if current is None:
                        found = False
                        break
                    try:
                        current = getattr(current, part)
                    except AttributeError:
                        current = Variable.Undefined()
                        break
                if found:
                    context.set_variable(field.variable_definition, current)

        assert not kwargs

        self.entry_point.interpret(context)

        if context.config.debug:
            execution.log = context.logger.log
            execution.finish_time = timezone.now()
            execution.save(update_fields=['log', 'finish_time'])

        return context
