# -*- coding: utf-8 -*-
#

from .common import *


class ConstantTest(TestCase):

    def test_init(self):
        integer_const = NumberConstant(value=33)
        self.failUnlessEqual(33, integer_const.value)

    def test_str(self):
        integer_const = NumberConstant(value=33)
        self.failUnlessEqual(str(33), str(integer_const))

    def test_interpret(self):
        integer_const = NumberConstant(value=33)
        context = Context()
        self.failUnlessEqual(33, integer_const.interpret(context))
