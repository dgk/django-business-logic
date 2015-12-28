# -*- coding: utf-8 -*-

from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils.encoding import python_2_unicode_compatible

from django.contrib.contenttypes.models import ContentType

from ..fields import DeepAttributeField

from node import Node


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
    program_type = models.ForeignKey(ProgramType)
    name = models.SlugField(_('Name'), max_length=255)

    content_type = models.ForeignKey(ContentType)

    class Meta:
        unique_together = (('program_type', 'name'),)
        verbose_name = _('Program argument')
        verbose_name_plural = _('Program arguments')

    def __str__(self):
        return self.name


class ProgramArgumentField(models.Model):
    program_argument = models.ForeignKey(ProgramArgument)
    name = DeepAttributeField(_('Name'), max_length=255)

    class Meta:
        verbose_name = _('Program argument field')
        verbose_name_plural = _('Program argument fields')
        ordering = ('name', )


class Program(models.Model):
    title = models.CharField(_('Title'), max_length=255)
    name = models.SlugField(_('Name'), max_length=255)

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

