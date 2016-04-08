# -*- coding: utf-8 -*-
#

from .common import *


class IfStatementTest(TestCase):
    def setUp(self):
        self.var_defs = {}

    def create_tree(self, branches_count):
        def reload_node(node):
            return Node.objects.get(id=node.id)

        def pairs(l):
            return [l[i:i + 2] for i in range(0, len(l), 2)]

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


        for condition_var, assignment_var in pairs(vars[:branches_count - branches_count % 2]):

            ifstatement = root.add_child(content_object=IfStatement())
            ifstatement.add_child(content_object=Variable(definition=self.var_defs[condition_var]))
            ifstatement = reload_node(ifstatement)
            assignment = ifstatement.add_child(content_object=Assignment())

            assignment.add_child(content_object=Variable(definition=self.var_defs[assignment_var]))
            assignment = reload_node(assignment)
            assignment.add_child(content_object=BooleanConstant(value=True))

        if branches_count % 2:
            assignment = ifstatement.add_child(content_object=Assignment())
            assignment.add_child(content_object=Variable(definition=self.var_defs['ElseEnter']))
            assignment = reload_node(assignment)
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
        self.failIf(context.get_variable(self.var_defs['ElseEnter'].id))

    def test_interpret_if_else(self):
        root = self.create_tree(3)
        context = Context()
        root.interpret(context)
        self.failIf(context.get_variable(self.var_defs['IfCondition'].id))
        self.failIf(context.get_variable(self.var_defs['IfEnter'].id))
        self.failUnless(context.get_variable(self.var_defs['ElseEnter'].id))

    def test_interpret_elif(self):
        root = self.create_tree(4)
        context = Context()
        context.set_variable(self.var_defs['ElseIfCondition1'].id, True)
        root.interpret(context)
        self.failIf(context.get_variable(self.var_defs['IfCondition'].id))
        self.failIf(context.get_variable(self.var_defs['IfEnter'].id))
        self.failIf(context.get_variable(self.var_defs['ElseEnter'].id))
        self.failUnless(context.get_variable(self.var_defs['ElseIfEnter1'].id))

    def test_interpret_elif_2(self):
        root = self.create_tree(6)
        context = Context()
        context.set_variable(self.var_defs['ElseIfCondition2'].id, True)
        root.interpret(context)
        self.failIf(context.get_variable(self.var_defs['IfCondition'].id))
        self.failIf(context.get_variable(self.var_defs['IfEnter'].id))
        self.failIf(context.get_variable(self.var_defs['ElseEnter'].id))
        self.failIf(context.get_variable(self.var_defs['ElseIfEnter1'].id))
        self.failUnless(context.get_variable(self.var_defs['ElseIfEnter2'].id))
