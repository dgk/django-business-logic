# -*- coding: utf-8 -*-
#

from .common import *
# also see .assignment
class VariableTest(TestCase):
    def test_definition(self):
        context = Context()
        root = Node.add_root()
        var_def = VariableDefinition(name='K1')
        root.add_child(content_object=var_def)
        var = Variable(definition=var_def)
        var_node = root.add_child(content_object=var)
        result = root.interpret(context)


    def test_variable_undefined(self):
        undefined = Variable.Undefined()
        self.failIf(undefined)

    def test_get_variable_returns_variable_undefined(self):
        context = Context()
        root = Node.add_root()
        var_def = VariableDefinition(name='K1')
        root.add_child(content_object=var_def)
        root.interpret(context)
        self.assertIsInstance(context.get_variable(var_def.id), Variable.Undefined)
