# -*- coding: utf-8 -*-
#

from django.test import TestCase
from ..models import *

class VariableTest(TestCase):
    def test_definition(self):
        context = Context()
        root = Node.add_root()
        var_def = VariableDefinition(name='K1')
        root.add_child(content_object=var_def)
        var = Variable(definition=var_def)
        var_node = root.add_child(content_object=var)
        result = root.interpret(context)

