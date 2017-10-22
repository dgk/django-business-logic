# -*- coding: utf-8 -*-
#

from .common import *


class SignalCatchException(Exception):
    pass


def raise_on_enter(**kwargs):
    raise SignalCatchException(kwargs)


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
        self.failUnlessRaises(SignalCatchException, node.interpret, context)

    def test_interpret_leave(self):
        node = Node.add_root()
        context = Context()

        signals.interpret_leave.connect(raise_on_enter)
        self.failUnlessRaises(SignalCatchException, node.interpret, context)

    def test_block_interpret_enter(self):
        node = Node.add_root()
        context = Context()

        signals.block_interpret_enter.connect(raise_on_enter)
        self.failUnlessRaises(SignalCatchException, node.interpret, context)

    def test_block_interpret_leave(self):
        node = Node.add_root()
        context = Context()

        signals.block_interpret_leave.connect(raise_on_enter)
        self.failUnlessRaises(SignalCatchException, node.interpret, context)
