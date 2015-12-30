# -*- coding: utf-8 -*-

from lxml import etree

from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils.encoding import python_2_unicode_compatible

from .context import Context
from .node import Node, NodeVisitor
from .variable import VariableDefinition

from ..fields import DeepAttributeField


class ProgramType(models.Model):
    title = models.CharField(_('Title'), max_length=255, db_index=True)
    name = models.SlugField(_('Name'), max_length=255, null=True, blank=True, unique=True, db_index=True)

    creation_time = models.DateTimeField(auto_now_add=True)
    modification_time = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Program type')
        verbose_name_plural = _('Program types')


@python_2_unicode_compatible
class ProgramArgument(models.Model):
    program_type = models.ForeignKey(ProgramType, related_name='argument')
    name = models.SlugField(_('Name'), max_length=255)

    content_type = models.ForeignKey(ContentType)
    variable_definition = models.OneToOneField(VariableDefinition)

    class Meta:
        unique_together = (('program_type', 'name'),)
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

        super(ProgramArgument, self).save(force_insert, force_update, using, update_fields)

    def delete(self, using=None):
        self.variable_definition.delete()
        super(ProgramArgument, self).delete(using)


class ProgramArgumentField(models.Model):
    program_argument = models.ForeignKey(ProgramArgument, related_name='field')
    name = DeepAttributeField(_('Name'), max_length=255)

    class Meta:
        verbose_name = _('Program argument field')
        verbose_name_plural = _('Program argument fields')
        ordering = ('name', )


class Program(models.Model):
    title = models.CharField(_('Title'), max_length=255)
    name = models.SlugField(_('Name'), max_length=255, unique=True, db_index=True)

    program_type = models.ForeignKey(ProgramType)

    creation_time = models.DateTimeField(auto_now_add=True)
    modification_time = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Program')
        verbose_name_plural = _('Programs')


@python_2_unicode_compatible
class ProgramVersion(models.Model):
    program = models.ForeignKey(Program, related_name='versions')
    entry_point = models.ForeignKey(Node, verbose_name=_('Entry point'))
    description = models.TextField(_('Description'), null=True, blank=True)
    creation_time = models.DateTimeField(auto_now_add=True)
    modification_time = models.DateTimeField(auto_now=True)

    is_default = models.NullBooleanField(_('Is default'), default=None)

    class Meta:
        unique_together = (('program', 'is_default'),)
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
        for program_argument in self.program.program_type.argument.all():
            try:
                argument = kwargs.pop(program_argument.name)
                assert program_argument.content_type.model_class() == argument.__class__
            except (KeyError, AssertionError, AttributeError):
                raise
            context.set_variable(program_argument.variable_definition_id, argument)

        assert not kwargs

        self.entry_point.interpret(context)

        return context

    def xml(self):
        root = etree.Element("xml")
        root.append(etree.Element('block'))
        #root.append(self.entry_point.xml_export())
        return etree.tostring(root)