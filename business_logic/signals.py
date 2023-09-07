# -*- coding: utf-8 -*-
#

from django.dispatch import Signal

block_interpret_enter = Signal()
"""Fired on entering to code block interpretation"""

block_interpret_leave = Signal()
"""Fired on leaving code block interpretation"""

statement_interpret_enter = Signal()
"""Fired on entering statement interpretation"""

statement_interpret_leave = Signal()
"""Fired on leaving statement interpretation"""

interpret_enter = Signal()
"""Fired on entering code interpretation"""

interpret_leave = Signal()
"""Fired on leaving code interpretation"""

interpret_exception = Signal()
"""Fired on interpretation exception"""
