# -*- coding: utf-8 -*-
#

from .common import *


class AssignmentTest(TestCase):

    def test_assignment(self):
        context = Context()

        root = Node.add_root()

        var_def = VariableDefinition(name='K1')
        root.add_child(content_object=var_def)
        root = Node.objects.get(id=root.id)

        assignment_node = root.add_child(content_object=Assignment())
        var = Variable(definition=var_def)
        var_node = assignment_node.add_child(content_object=var)
        tree_1plus2mul3(parent=assignment_node)

        root = Node.objects.get(id=root.id)

        result = root.interpret(context)
        var_value = context.get_variable(var_def)
        self.assertEqual(7, var_value)

    def test_var_assignment(self):
        context = Context()

        root = Node.add_root()

        var_def1 = VariableDefinition(name='K1')
        root.add_child(content_object=var_def1)
        root = Node.objects.get(id=root.id)

        var_def2 = VariableDefinition(name='K2')
        root.add_child(content_object=var_def2)
        root = Node.objects.get(id=root.id)

        assignment_node = root.add_child(content_object=Assignment())
        var1 = Variable(definition=var_def1)
        var_node = assignment_node.add_child(content_object=var1)
        tree_1plus2mul3(parent=assignment_node)

        root = Node.objects.get(id=root.id)

        assignment_node = root.add_child(content_object=Assignment())
        var2 = Variable(definition=var_def2)
        var_node = assignment_node.add_child(content_object=var2)
        var_node = assignment_node.add_child(content_object=var1)

        root = Node.objects.get(id=root.id)
        result = root.interpret(context)
        var_value = context.get_variable(var_def2)
        self.assertEqual(7, var_value)
