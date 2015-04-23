# -*- coding: utf-8 -*-
#


from django.test import TestCase
from ..models import *



class ConstantTest(TestCase):
    def test_init(self):
        integer_const = IntegerConstant(value=33)
        self.failUnlessEqual(33, integer_const.value)

    def test_str(self):
        integer_const = IntegerConstant(value=33)
        self.failUnlessEqual(str(33), str(integer_const))

    def test_interpret(self):
        integer_const = IntegerConstant(value=33)
        context = Context()
        self.failUnlessEqual(33, integer_const.interpret(context))
