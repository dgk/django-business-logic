# -*- coding: utf-8 -*-
#

from django.dispatch import Signal

block_interpret_enter = Signal(providing_args=('node',))
"""Fired on entering to code block interpretation"""

block_interpret_leave = Signal(providing_args=('node',))
"""Fired on leaving code block interpretation"""

statement_interpret_enter = Signal(providing_args=('node',))
"""Fired on entering statement interpretation"""

statement_interpret_leave = Signal(providing_args=('node',))
"""Fired on leaving statement interpretation"""

interpret_enter = Signal(providing_args=('node', 'value'))
"""Fired on entering code interpretation"""

interpret_leave = Signal(providing_args=('node', 'value'))
"""Fired on leaving code interpretation"""

interpret_exception = Signal(providing_args=('node', 'exception', 'traceback'))
"""Fired on interpretation exception"""
