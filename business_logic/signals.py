# -*- coding: utf-8 -*-
#

from django.dispatch import Signal

block_interpret_enter = Signal(providing_args=('node', ))
block_interpret_leave = Signal(providing_args=('node', ))

statement_interpret_enter = Signal(providing_args=('node', ))
statement_interpret_leave = Signal(providing_args=('node', ))

interpret_enter = Signal(providing_args=('node', 'value'))
interpret_leave = Signal(providing_args=('node', 'value'))

