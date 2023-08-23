# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from .context import Context
from .log import Execution, ExecutionArgument
from .node import Node
from .variable import VariableDefinition, Variable
from .types_ import DJANGO_FIELDS_FOR_TYPES

from ..config import ExceptionHandlingPolicy
from ..fields import DeepAttributeField


class ExecutionEnvironment(models.Model):
    """
    Environment of execution.

    Can be linked to any of :class:`business_logic.models.ProgramInterface` ->
    :class:`business_logic.models.Program` -> :class:`business_logic.models.ProgramVersion` chain.

    Contains list of :class:`business_logic.models.FunctionLibrary`
    and defines parameters for :class:`business_logic.models.Context` creation.


    Attributes:
        title(str): human-readable name
        description(str): description
        libraries: list of :class:`business_logic.models.FunctionLibrary` available to execution
        debug(bool): default=False
        log(bool): default=False
        cache(bool): default=True
        exception_handling_policy(:class:`business_logic.config.ExceptionHandlingPolicy`):
    """
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


class ProgramInterface(models.Model):
    """
    Determines interface for :class:`business_logic.models.Program`.
    Should be configured by adding one or more :class:`business_logic.models.ProgramArgument`.
    Can hold link to :class:`business_logic.models.ExecutionEnvironment`.

    Attributes:
        title(str): human-readable name
        code(str): machine-readable code for programmatic access
        environment(:class:`business_logic.models.ExecutionEnvironment`): execution environment, can be empty
        programs(:class:`business_logic.models.Program`): queryset of child Program
    """
    title = models.CharField(_('Title'), max_length=255, db_index=True)
    code = models.SlugField(_('Code'), max_length=255, null=True, blank=True, unique=True, db_index=True)

    environment = models.ForeignKey('ExecutionEnvironment', null=True, blank=True, on_delete=models.SET_NULL)

    creation_time = models.DateTimeField(auto_now_add=True)
    modification_time = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('id',)
        verbose_name = _('Program interface')
        verbose_name_plural = _('Program interfaces')

    def __str__(self):
        return self.title


class ProgramArgument(models.Model):
    program_interface = models.ForeignKey(ProgramInterface, related_name='arguments', on_delete=models.CASCADE)
    name = models.SlugField(_('Name'), max_length=255)

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    variable_definition = models.OneToOneField(
        VariableDefinition, related_name='program_argument', on_delete=models.CASCADE)

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

    def delete(self, **kwargs):
        for field in self.fields.all():
            field.delete()

        self.variable_definition.delete()
        super(ProgramArgument, self).delete(**kwargs)


class ProgramArgumentField(models.Model):
    """
    Attributes:
        program_argument(:class:`business_logic.models.ProgramArgument`): argument
            of :class:`business_logic.models.ProgramInterface`
        name(str): name of the field, can include dots for nested fields
        title: human-readable name
        variable_definition(:class:`business_logic.models.VariableDefinition`): definition for variable
    """
    program_argument = models.ForeignKey(ProgramArgument, related_name='fields', on_delete=models.CASCADE)
    name = DeepAttributeField(_('Name'), max_length=255)
    title = models.CharField(_('Title'), max_length=255, null=True, blank=True)
    variable_definition = models.OneToOneField(
        VariableDefinition, related_name='program_argument_field', on_delete=models.CASCADE)

    class Meta:
        unique_together = (('program_argument', 'name'),)
        verbose_name = _('Program argument field')
        verbose_name_plural = _('Program argument fields')
        ordering = ('name',)

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
        titles = [
            model._meta.verbose_name,
        ]
        for field_name in self.name.split('.'):
            field = model._meta.get_field(field_name)
            titles.append(field.verbose_name)
            is_django_model = field.__class__ in DJANGO_FIELDS_FOR_TYPES['model']

            if is_django_model:
                model = field.related_model

        return '.'.join(titles)

    def delete(self, **kwargs):
        self.variable_definition.delete()
        super(ProgramArgumentField, self).delete(**kwargs)


class Program(models.Model):
    """
    Implements :class:`business_logic.models.ProgramInterface`.
    Can hold link to :class:`business_logic.models.ExecutionEnvironment`.

    Attributes:
        title(str): human-readable name
        code(str): machine-readable code for programmatic access
        environment(:class:`business_logic.models.ExecutionEnvironment`): execution environment, can be empty
        program_interface(:class:`business_logic.models.ProgramInterface`): implemented interface
        versions(:class:`business_logic.models.ProgramVersion`): queryset of child ProgramVersion

    """
    title = models.CharField(_('Title'), max_length=255)
    code = models.SlugField(_('Code'), max_length=255, unique=True, db_index=True)

    program_interface = models.ForeignKey(ProgramInterface, on_delete=models.CASCADE, related_name='programs')

    environment = models.ForeignKey('ExecutionEnvironment', null=True, blank=True, on_delete=models.SET_NULL)

    creation_time = models.DateTimeField(auto_now_add=True)
    modification_time = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Program')
        verbose_name_plural = _('Programs')
        ordering = ('id',)

    def __str__(self):
        return '{}: {}({})'.format(self.program_interface, self.title, self.code)


class ProgramVersion(models.Model):
    """
    Acts as version of :class:`business_logic.models.Program`.
    Main holder of visually editable code.
    Can hold link to :class:`business_logic.models.ExecutionEnvironment`.

    Attributes:
        title(str): human-readable name
        description(str): human-readable description
        environment(:class:`business_logic.models.ExecutionEnvironment`): execution environment, can be empty
        is_default(bool): default=False, can be used for choosing suitable `ProgramVersion`.
            Only one `ProgramVersion` for given `:class:`business_logic.models.Program` can have this field value as `True`
        entry_point(:class:`business_logic.models.Node`): entry point of visually editable code
        program(:class:`business_logic.models.Program`): parent Program
    """
    title = models.CharField(_('Title'), max_length=255, null=True, blank=True)
    description = models.TextField(_('Description'), null=True, blank=True)

    is_default = models.BooleanField(_('Is default'), default=False)

    program = models.ForeignKey(Program, related_name='versions', on_delete=models.CASCADE)
    entry_point = models.ForeignKey(Node, verbose_name=_('Entry point'), on_delete=models.CASCADE)

    environment = models.ForeignKey('ExecutionEnvironment', null=True, blank=True, on_delete=models.SET_NULL)

    creation_time = models.DateTimeField(auto_now_add=True)
    modification_time = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Program version')
        verbose_name_plural = _('Program versions')
        ordering = ('id',)

    def __str__(self):
        return self.title

    def copy(self, new_title):
        """
        Creates a copy of self with given title.
        Suitable for "save as" actions.

        Args:
            new_title: `str` new title
        Returns:
            new :class:`business_logic.models.ProgramVersion` instance
        """
        entry_point = self.entry_point.clone()
        new_version = ProgramVersion.objects.create(title=new_title, program=self.program, entry_point=entry_point)
        new_version.save()
        return new_version

    def execute(self, context=None, **kwargs):
        """
        Main function for program execution

        Args:
            context(:class:`business_logic.models.Context`, optional): Context instance
            **kwargs: program arguments

        Returns:
            :class:`business_logic.models.Context`: Context instance

        Raises:
            KeyError: If any of program argument omitted

            AssertionError: if any of program argument have incorrect type,
                if passed unregistered program argument

        Todo:
            * create own exceptions instead AssertionError/KeyError/etc

        See Also:
            * :class:`business_logic.models.Context`
            * :class:`business_logic.models.ExecutionEnvironment`
        """
        context = context if context is not None else Context()
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
                    object_id=argument.id)

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
