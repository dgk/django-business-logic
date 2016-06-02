# -*- coding: utf-8 -*-
#

from .common import *


class TypesTest(TestCase):
    def test_type_for_field(self):
        boolen_type = Type(type='bool')
        self.failUnless(
            issubclass(Type.get_constant_for_type(boolen_type), BooleanConstant)
        )

    def test_model_type(self):
        model_type = Type(type='model', model_type=ContentType.objects.get_for_model(TestModel))
        self.failUnless(issubclass(Type.get_constant_for_type(model_type), TestModel))

