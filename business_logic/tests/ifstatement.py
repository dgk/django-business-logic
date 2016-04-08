# -*- coding: utf-8 -*-
#

from .common import *


class IfStatementTest(TestCase):
    def setUp(self):
        self.var_defs = {}

    def create_tree(self, branches_count):
        def reload_node(node):
            return Node.objects.get(id=node.id)

        def chunks(l, n):
            return [l[i:i + n] for i in range(0, len(l), n)]

        root = Node.add_root()

        vars = (
            'IfCondition',
            'IfEnter',
            'ElseIfCondition1',
            'ElseIfEnter1',
            'ElseIfCondition2',
            'ElseIfEnter2',
            'ElseEnter',
        )

        for variable_name in vars:
            var_def = VariableDefinition(name=variable_name)
            self.var_defs[variable_name] = var_def
            root.add_child(content_object=var_def)
            root = reload_node(root)

        ifstatement = root.add_child(content_object=IfStatement())
        ifstatement.add_child(content_object=Variable(definition=self.var_defs['IfCondition']))

        ifstatement = reload_node(ifstatement)

        assignment = ifstatement.add_child(content_object=Assignment())

        assignment.add_child(content_object=Variable(definition=self.var_defs['IfEnter']))
        assignment.add_child(content_object=BooleanConstant(value=True))

        if branches_count % 2:
            assignment = ifstatement.add_child(content_object=Assignment())
            assignment.add_child(content_object=Variable(definition=self.var_defs['ElseEnter']))
            assignment.add_child(content_object=BooleanConstant(value=True))

        return reload_node(root)

    def test_setup(self):
        root = self.create_tree(2)
        context = Context()
        root.interpret(context)

        self.assertIsInstance(context.get_variable(self.var_defs['IfCondition'].id),
                              Variable.Undefined)
        self.assertIsInstance(context.get_variable(self.var_defs['IfEnter'].id),
                              Variable.Undefined)


    def test_interpret_if(self):
        root = self.create_tree(2)
        context = Context()
        context.set_variable(self.var_defs['IfCondition'].id, True)
        root.interpret(context)
        self.failUnless(context.get_variable(self.var_defs['IfCondition'].id))
        self.failUnless(context.get_variable(self.var_defs['IfEnter'].id))


    def test_interpret_if_else(self):
        root = self.create_tree(3)
        context = Context()
        root.interpret(context)
        self.failIf(context.get_variable(self.var_defs['IfCondition'].id))
        self.failIf(context.get_variable(self.var_defs['IfEnter'].id))
        self.failUnless(context.get_variable(self.var_defs['ElseEnter'].id))
