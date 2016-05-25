# -*- coding: utf-8 -*-
#

from django.test import TestCase

from ..models import *
from .. import signals

class TestException(Exception):
    pass

def raise_on_enter(**kwargs):
    raise TestException, kwargs

class SignalsTest(TestCase):
    def tearDown(self):
        signals.interpret_enter.disconnect(raise_on_enter)
        signals.interpret_leave.disconnect(raise_on_enter)
        signals.block_interpret_enter.disconnect(raise_on_enter)
        signals.block_interpret_leave.disconnect(raise_on_enter)

    def test_interpret_enter(self):
        node = Node.add_root()
        context = Context()

        signals.interpret_enter.connect(raise_on_enter)
        self.failUnlessRaises(TestException, node.interpret, context)

    def test_interpret_leave(self):
        node = Node.add_root()
        context = Context()

        signals.interpret_leave.connect(raise_on_enter)
        self.failUnlessRaises(TestException, node.interpret, context)

    def test_block_interpret_enter(self):
        node = Node.add_root()
        context = Context()

        signals.block_interpret_enter.connect(raise_on_enter)
        self.failUnlessRaises(TestException, node.interpret, context)

    def test_block_interpret_leave(self):
        node = Node.add_root()
        context = Context()

        signals.block_interpret_leave.connect(raise_on_enter)
        self.failUnlessRaises(TestException, node.interpret, context)

