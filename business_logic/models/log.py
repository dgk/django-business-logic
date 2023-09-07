# -*- coding: utf-8 -*-
#
from traceback import format_exception

from django.db import models
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
import six
from django.utils.translation import gettext_lazy as _

from treebeard.al_tree import AL_Node

from .node import Node

try:
    LOG_ENTRY_VALUE_LENGTH = settings.PROGRAM_LOG_ENTRY_VALUE_LENGTH
except AttributeError:
    LOG_ENTRY_VALUE_LENGTH = 255


class Logger(object):
    """
    Processed log creation during calling the :func:`business_logic.models.ProgramVersion.execute` method.
    Will work only if ``Context.config.log`` flag is set to ``True``.

    See Also:
        * :class:`business_logic.config.ContextConfig`
        * :class:`business_logic.models.Context`
        * :ref:`Signals`
    """
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
        value = str(value)
        if len(value) > LOG_ENTRY_VALUE_LENGTH:
            value = value[:LOG_ENTRY_VALUE_LENGTH - 3] + '...'
        return value


class LogEntry(AL_Node):
    """
    Derived from `treebeard.AL_Node <https://django-treebeard.readthedocs.io/en/latest/al_tree.html#treebeard.al_tree.AL_Node>`_.
    Stores single :class:`business_logic.models.Node` interpretation event.
    Will be created only if ``Context.config.log`` flag is set to ``True``.

    Attributes:
        node(:class:`business_logic.models.Node`): currently interpreted node
        previous_value(): value before interpretation (actual for :class:`business_logic.models.Variable`)
        current_value(): value after interpretation
        exception(:class:`business_logic.models.ExceptionLog`): exception if it raised during interpretation.

    See Also:
        * :class:`business_logic.config.ContextConfig`
        * :class:`business_logic.models.Context`
    """
    parent = models.ForeignKey('self', null=True, blank=True, related_name='children', on_delete=models.CASCADE)
    sib_order = models.PositiveIntegerField()

    node = models.ForeignKey(Node, verbose_name=_('Program node'), on_delete=models.CASCADE)
    previous_value = models.CharField(_('Previous value'), max_length=LOG_ENTRY_VALUE_LENGTH)
    current_value = models.CharField(_('Current value'), max_length=LOG_ENTRY_VALUE_LENGTH)


class ExceptionLog(models.Model):
    """
    Stores information about exception raised during node interpretation.

    Attributes:
       log_entry(:class:`business_logic.models.LogEntry`): parent LogEntry
       module(:obj:`str`): exception module
       type(:obj:`str`): exception type
       message(:obj:`str`): exception message
       traceback(:obj:`str`): traceback

    """
    log_entry = models.OneToOneField('LogEntry', related_name='exception', on_delete=models.CASCADE)
    module = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    message = models.CharField(max_length=512)
    traceback = models.TextField()


class Execution(models.Model):
    """
    Stores information about calling the :func:`business_logic.models.ProgramVersion.execute` method.
    Will be created only if ``Context.config.debug`` flag is set to ``True``.

    Attributes:
        program_version(:class:`business_logic.models.ProgramVersion`): executed ProgramVersion
        arguments(:obj:`list` of :class:`business_logic.models.ExecutionArgument`): arguments of execution
        start_time(:obj:`datetime`): start execution time
        finish_time(:obj:`datetime`): finish execution time
        log(:class:`business_logic.models.LogEntry`): root node of LogEntries

    See Also:
        * :class:`business_logic.config.ContextConfig`
        * :class:`business_logic.models.Context`
    """
    log = models.OneToOneField('business_logic.LogEntry', null=True, on_delete=models.SET_NULL)
    program_version = models.ForeignKey('business_logic.ProgramVersion', on_delete=models.CASCADE)
    start_time = models.DateTimeField(auto_now_add=True)
    finish_time = models.DateTimeField(null=True)

    class Meta:
        ordering = ('-id',)


class ExecutionArgument(models.Model):
    """
    Stores information about argument passed to :func:`business_logic.models.ProgramVersion.execute`.

    Attributes:
        execution(:class:`business_logic.models.Execution`): parent Execution object
        program_argument(:class:`business_logic.models.ProgramArgument`): parent ProgramArgument object
        content_object(:class:`django.db.models.Model`): passed argument
    """
    execution = models.ForeignKey('business_logic.Execution', related_name='arguments', on_delete=models.CASCADE)
    program_argument = models.ForeignKey('business_logic.ProgramArgument', on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
