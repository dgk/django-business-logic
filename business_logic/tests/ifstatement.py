# -*- coding: utf-8 -*-
#

from .common import *


class IfStatementTest(TestCase):
    def test_interpret_if(self):
        def reload_node(node):
            return Node.objects.get(id=node.id)

        root = Node.add_root()

        vars = ('IfCondition', 'IfEnter',)
        var_defs = {}

        for variable_name in vars:
            var_def = VariableDefinition(name=variable_name)
            var_defs[variable_name] = var_def
            root.add_child(content_object=var_def)
            root = reload_node(root)

        ifstatement = root.add_child(content_object=IfStatement())
        ifstatement.add_child(content_object=Variable(definition=var_defs['IfCondition']))

        ifstatement = reload_node(ifstatement)

        assignment = ifstatement.add_child(content_object=Assignment())

        assignment.add_child(content_object=Variable(definition=var_defs['IfEnter']))
        assignment.add_child(content_object=BooleanConstant(value=True))

        root = Node.objects.get(id=root.id)

        context = Context()
        root.interpret(context)
        self.failIf(context.get_variable(var_defs['IfCondition'].id))
        self.failIf(context.get_variable(var_defs['IfEnter'].id))


        context = Context()
        context.set_variable(var_defs['IfCondition'].id, True)
        root.interpret(context)
        self.failUnless(context.get_variable(var_defs['IfCondition'].id))
        self.failUnless(context.get_variable(var_defs['IfEnter'].id))
