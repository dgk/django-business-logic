# -*- coding: utf-8 -*-
#

from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils.encoding import smart_unicode

from django.contrib.contenttypes.models import ContentType

from node import Node


class Program(models.Model):
    title = models.CharField(_('Title'), max_length=255)
    name = models.SlugField(_('Name'), max_length=255)

    creation_time = models.DateTimeField(auto_now_add=True)
    modification_time = models.DateTimeField(auto_now=True)


    class Meta:
        verbose_name = _('Program')
        verbose_name_plural = _('Programs')


class ProgramArgument(models.Model):
    program  = models.ForeignKey(Program)
    name = models.SlugField(_('Name'), max_length=255)

    content_type = models.ForeignKey(ContentType)

    class Meta:
        unique_together = (('program', 'name'), )
        verbose_name = _('Program argument')
        verbose_name_plural = _('Program arguments')

    def __unicode__(self):
        return smart_unicode(self.title)


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

    def __unicode__(self):
        return smart_unicode(self.title)
        return smart_unicode('%s: %s' % (self.program.title, self.title))

    def copy(self, new_title):
        entry_point = self.entry_point.clone()
        new_version = ProgramVersion.objects.create(title=new_title,
                                                    program=self.program, entry_point=entry_point)
        new_version.save()
        return new_version

