# -*- coding: utf-8 -*-
#

from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils.encoding import smart_unicode

from django.contrib.contenttypes.models import ContentType

from node import Node

class Program(models.Model):
    title = models.CharField(_('Title'), max_length=255)
    type = models.ForeignKey('ProgramType', related_name='programs')

    creation_time = models.DateTimeField(auto_now_add=True)
    modification_time = models.DateTimeField(auto_now=True)

    active_version = models.ForeignKey('ProgramVersion',
            related_name='active', verbose_name=_('Active version'),
            null=True, blank=True)

    testing_version = models.ForeignKey('ProgramVersion',
            related_name='testing', verbose_name=_('Testing version'),
            null=True, blank=True)

    class Meta:
        verbose_name = _('Program')
        verbose_name_plural = _('Programs')

    def __unicode__(self):
        return smart_unicode(self.title)

    def set_testing_version(self, version):
        self.testing_version = version
        self.save()

    def set_active_version(self, version):
        self.active_version = version
        self.save()

class ProgramVersion(models.Model):
    program = models.ForeignKey(Program, related_name='versions')
    entry_point = models.ForeignKey(Node, verbose_name=_('Entry point'))
    title = models.CharField(_('Title'), max_length=255)
    creation_time = models.DateTimeField(auto_now_add=True)
    modification_time = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Program version')
        verbose_name_plural = _('Program versions')

    def __unicode__(self):
        return smart_unicode(self.title)
        return smart_unicode('%s: %s' % (self.program.title, self.title))

    def copy(self, new_title):
        entry_point = self.entry_point.clone()
        new_version = ProgramVersion.objects.create(title=new_title,
                program=self.program, entry_point=entry_point)
        new_version.save()
        return new_version

class ProgramType(models.Model):
    title = models.CharField(_('Title'), max_length=255)
    input_argumets = models.ForeignKey('ArgumentSet',
            related_name='inputs', verbose_name=_('Input arguments'))
    output_argumets = models.ForeignKey('ArgumentSet',
            related_name='outputs', verbose_name=_('Output arguments'))
    class Meta:
        verbose_name = _('Program type')
        verbose_name_plural = _('Program types')

    def __unicode__(self):
        return smart_unicode(self.title)

class ArgumentSet(models.Model):
    title = models.CharField(_('Title'), max_length=255)
    class Meta:
        verbose_name = _('Program argument set')
        verbose_name_plural = _('Program argument sets')

    def __unicode__(self):
        return smart_unicode(self.title)

class Argument(models.Model):
    title = models.CharField(_('Title'), max_length=255)
    content_type = models.ForeignKey(ContentType)
    argument_set = models.ForeignKey(ArgumentSet,
        verbose_name=_('Program argument set'))
    order = models.PositiveIntegerField(_('Order'),
            null=False, blank=False, default=0)

    class Meta:
        ordering = ('order', )
        unique_together = (('argument_set', 'order'), )
        verbose_name = _('Program argument')
        verbose_name_plural = _('Program arguments')

    def __unicode__(self):
        return smart_unicode(self.title)

