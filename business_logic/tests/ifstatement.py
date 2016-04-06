# -*- coding: utf-8 -*-
#

from .common import *


class IfStatementTest(TestCase):
    def test_interpret_if(self):
        root = Node.add_root()

        var_def1 = VariableDefinition(name='K1')
        root.add_child(content_object=var_def1)
        root = Node.objects.get(id=root.id)

        var_def2 = VariableDefinition(name='K2')
        root.add_child(content_object=var_def2)
        root = Node.objects.get(id=root.id)

        root.add_child(content_object=IfStatement())

        for value, expected in ((True, 1), (False, 0)):
            variable_assign_value()

        integer_const = IntegerConstant(value=33)
        context = Context()
        self.failUnlessEqual(33, integer_const.interpret(context))
