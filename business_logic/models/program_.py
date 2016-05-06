# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from lxml import etree

from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils.encoding import python_2_unicode_compatible

from .context import Context
from .node import Node, NodeVisitor
from .variable import VariableDefinition

from ..fields import DeepAttributeField


@python_2_unicode_compatible
class ProgramInterface(models.Model):
    title = models.CharField(_('Title'), max_length=255, db_index=True)
    name = models.SlugField(_('Name'), max_length=255, null=True, blank=True, unique=True, db_index=True)

    creation_time = models.DateTimeField(auto_now_add=True)
    modification_time = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Program interface')
        verbose_name_plural = _('Program interfaces')

    def __str__(self):
        return self.title


@python_2_unicode_compatible
class ProgramArgument(models.Model):
    program_interface = models.ForeignKey(ProgramInterface, related_name='argument')
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

            for field in self.field.all():
                field.save()

        super(ProgramArgument, self).save(force_insert, force_update, using, update_fields)

    def delete(self, using=None):
        for field in self.field.all():
            field.delete()

        self.variable_definition.delete()
        super(ProgramArgument, self).delete(using)


@python_2_unicode_compatible
class ProgramArgumentField(models.Model):
    program_argument = models.ForeignKey(ProgramArgument, related_name='field')
    name = DeepAttributeField(_('Name'), max_length=255)
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

    def delete(self, using=None):
        self.variable_definition.delete()
        super(ProgramArgumentField, self).delete(using)


@python_2_unicode_compatible
class Program(models.Model):
    title = models.CharField(_('Title'), max_length=255)
    name = models.SlugField(_('Name'), max_length=255, unique=True, db_index=True)

    program_interface = models.ForeignKey(ProgramInterface)

    creation_time = models.DateTimeField(auto_now_add=True)
    modification_time = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Program')
        verbose_name_plural = _('Programs')

    def __str__(self):
        return '{}: {}({})'.format(self.program_interface, self.title, self.name)


@python_2_unicode_compatible
class ProgramVersion(models.Model):
    program = models.ForeignKey(Program, related_name='versions')
    entry_point = models.ForeignKey(Node, verbose_name=_('Entry point'))
    description = models.TextField(_('Description'), null=True, blank=True)
    creation_time = models.DateTimeField(auto_now_add=True)
    modification_time = models.DateTimeField(auto_now=True)

    is_default = models.BooleanField(_('Is default'), default=False)

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

    def interpret(self, **kwargs):
        context = kwargs.pop('context', Context())
        for program_argument in self.program.program_interface.argument.all():
            try:
                argument = kwargs.pop(program_argument.name)
                assert program_argument.content_type.model_class() == argument.__class__
            except (KeyError, AssertionError, AttributeError):
                raise
            context.set_variable(program_argument.variable_definition, argument)

        assert not kwargs

        self.entry_point.interpret(context)

        return context
