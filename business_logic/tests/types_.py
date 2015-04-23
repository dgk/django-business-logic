# -*- coding: utf-8 -*-
#


from django.test import TestCase
from django.contrib.contenttypes.models import ContentType

from ..models import *
from .models import *



class TypesTest(TestCase):
    def test_type_for_field(self):
        boolen_type = Type(type='bool')
        self.failUnless(issubclass(Type.get_constant_for_type(boolen_type),
            BooleanConstant))

    def test_model_type(self):
        model_type = Type(type='model', model_type=ContentType.objects.get_for_model(TestModel))
        self.failUnless(issubclass(Type.get_constant_for_type(model_type),
            TestModel))

    def test_decimal_type(self):
        decimal_type = Type(type='decimal')
        self.failUnless(issubclass(Type.get_constant_for_type(decimal_type),
            DecimalConstant))

    def test_list_type(self):
        decimal_type = Type(type='decimal', is_list=True)

    def test_model_list_type(self):
        pass
