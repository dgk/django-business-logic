# -*- coding: utf-8 -*-
#

from .common import *


class StopTest(TestCase):

    def test_block(self):
        root = Node.add_root()
        node1 = root.add_child(content_object=StopInterpretation())
        node2 = variable_assign_value(parent=root)
        root = Node.objects.get(id=root.id)
        context = Context()
        root.interpret(context)
        self.assertIsInstance(context.get_variable(VariableDefinition.objects.get(name='A')), Variable.Undefined)

    def test_nesting(self):
        root = Node.add_root()
        node1 = root.add_child()
        node1.add_child(content_object=StopInterpretation())
        root = Node.objects.get(id=root.id)
        node2 = root.add_child()
        variable_assign_value(parent=node2)
        root = Node.objects.get(id=root.id)
        context = Context()
        root.interpret(context)
        self.assertIsInstance(context.get_variable(VariableDefinition.objects.get(name='A')), Variable.Undefined)
