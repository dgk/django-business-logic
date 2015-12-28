# -*- coding: utf-8 -*-
#

from django.db import models
from django.utils.translation import ugettext_lazy as _

from result import Result

class MessageType(models.Model):
    title = models.CharField(_('Title'), max_length=255, null=False, blank=False)

    class Meta:
        verbose_name = _('Message type')
        verbose_name_plural = _('Message types')

    def __unicode__(self):
        return unicode(self.title)

class Message(models.Model):
    text = models.TextField(_('Message'), max_length=1024, null=False, blank=False)
    type = models.ForeignKey(MessageType)

    def interpret(self, ctx):
        ResultMessage.objects.create(result=ctx.result, message=self)

    class Meta:
        verbose_name = _('Message')
        verbose_name_plural = _('Messages')

class ResultMessage(models.Model):
    message = models.ForeignKey(Message, null=False, blank=False)
    result = models.ForeignKey(Result, related_name='messages',
            null=False, blank=False)
    class Meta:
        verbose_name = _('Result message')
        verbose_name_plural = _('Result messages')

