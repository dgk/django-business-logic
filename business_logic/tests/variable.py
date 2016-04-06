# -*- coding: utf-8 -*-
#

from .common import *

class VariableTest(TestCase):
    def test_definition(self):
        context = Context()
        root = variable_assign_value()
        var_def = root.get_children()[0].content_object
        root.interpret(context)
        self.assertEqual(1, context.get_variable(var_def.id))

