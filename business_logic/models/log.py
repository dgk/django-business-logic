# -*- coding: utf-8 -*-
#

from django.db import models
from django.utils.encoding import smart_unicode
from django.utils.translation import ugettext_lazy as _
from django.conf import settings

from treebeard.al_tree import AL_Node

from node import Node

try:
    LOG_ENTRY_VALUE_LENGTH = settings.PROGRAM_LOG_ENTRY_VALUE_LENGTH
except AttributeError:
    LOG_ENTRY_VALUE_LENGTH = 255

class Logger:
    def __init__(self):
        self.log = None
        self._stack = []

    def interpret_enter(self, **kwargs):
        node = kwargs['node']
        context = kwargs['sender']
        value = kwargs['value']

        if not self.log:
            # first record
            log_node = LogEntry.add_root(node=node)
            self.log = log_node
        else:
            log_node = parent=self._stack[-1].add_child(node=node)
        if not node.is_block():
            log_node.previous_value = self.prepare_value(node.content_object)
        self._stack.append(log_node)
        log_node.save()

    def interpret_leave(self, **kwargs):
        node = kwargs['node']
        context = kwargs['sender']
        value = kwargs['value']
        node = self._stack.pop()
        node.current_value = self.prepare_value(value)
        node.save()

    def prepare_value(self, value):
        value = unicode(value)
        if len(value) > LOG_ENTRY_VALUE_LENGTH:
            value = value[:LOG_ENTRY_VALUE_LENGTH - 3] + '...'
        return value

class LogEntry(AL_Node):
    parent = models.ForeignKey('self', null=True, blank=True, related_name='children')
    sib_order = models.PositiveIntegerField()

    node = models.ForeignKey(Node, verbose_name=_('Program node'))
    previous_value = models.CharField(_('Previous value'), max_length=LOG_ENTRY_VALUE_LENGTH)
    current_value = models.CharField(_('Current value'), max_length=LOG_ENTRY_VALUE_LENGTH)


