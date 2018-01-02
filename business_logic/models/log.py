# -*- coding: utf-8 -*-
#
from traceback import format_exception

from django.db import models
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.utils import six
from django.utils.translation import ugettext_lazy as _

from treebeard.al_tree import AL_Node

from .node import Node

try:
    LOG_ENTRY_VALUE_LENGTH = settings.PROGRAM_LOG_ENTRY_VALUE_LENGTH
except AttributeError:
    LOG_ENTRY_VALUE_LENGTH = 255


class Logger(object):

    def __init__(self):
        self.log = None
        self._stack = []
        self.exceptions = {}

    def interpret_enter(self, node, **kwargs):
        if not self.log:
            # first record
            log_entry = LogEntry.add_root(node=node)
            self.log = log_entry
        else:
            log_entry = parent = self._stack[-1].add_child(node=node)
        if not node.is_block():
            log_entry.previous_value = self.prepare_value(node.content_object)
        self._stack.append(log_entry)
        log_entry.save()

    def interpret_leave(self, node, value, **kwargs):
        log_entry = self._stack.pop()
        log_entry.current_value = self.prepare_value(value)
        log_entry.save()

        exception, traceback = self.exceptions.pop(node, (None, None))
        if exception:
            ExceptionLog.objects.create(
                log_entry=log_entry,
                type=exception.__class__.__name__,
                module=exception.__class__.__module__,
                message=str(exception),
                traceback=format_exception(exception.__class__, exception, traceback))

    def interpret_exception(self, node, exception, traceback, **kwargs):
        self.exceptions[node] = (exception, traceback)

    def prepare_value(self, value):
        value = six.text_type(value)
        if len(value) > LOG_ENTRY_VALUE_LENGTH:
            value = value[:LOG_ENTRY_VALUE_LENGTH - 3] + '...'
        return value


class LogEntry(AL_Node):
    parent = models.ForeignKey('self', null=True, blank=True, related_name='children', on_delete=models.CASCADE)
    sib_order = models.PositiveIntegerField()

    node = models.ForeignKey(Node, verbose_name=_('Program node'), on_delete=models.CASCADE)
    previous_value = models.CharField(_('Previous value'), max_length=LOG_ENTRY_VALUE_LENGTH)
    current_value = models.CharField(_('Current value'), max_length=LOG_ENTRY_VALUE_LENGTH)


class ExceptionLog(models.Model):
    log_entry = models.OneToOneField('LogEntry', related_name='exception', on_delete=models.CASCADE)
    module = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    message = models.CharField(max_length=512)
    traceback = models.TextField()


class ExecutionArgument(models.Model):
    execution = models.ForeignKey('business_logic.Execution', related_name='arguments', on_delete=models.CASCADE)
    program_argument = models.ForeignKey('business_logic.ProgramArgument', on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')


class Execution(models.Model):
    log = models.OneToOneField('business_logic.LogEntry', null=True, on_delete=models.SET_NULL)
    program_version = models.ForeignKey('business_logic.ProgramVersion', on_delete=models.CASCADE)
    start_time = models.DateTimeField(auto_now_add=True)
    finish_time = models.DateTimeField(null=True)

    class Meta:
        ordering = ('-id',)
