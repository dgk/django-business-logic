# -*- coding: utf-8 -*-
#

from .common import *


class IfStatementTest(TestCase):

    def test_interpret_if(self):
        root, var_defs = create_if_statement(2)
        context = Context()
        context.set_variable(var_defs['IfCondition'], True)
        root.interpret(context)
        self.assertTrue(context.get_variable(var_defs['IfCondition']))
        self.assertTrue(context.get_variable(var_defs['IfEnter']))
        self.assertFalse(context.get_variable(var_defs['ElseEnter']))

    def test_interpret_if_else(self):
        root, var_defs = create_if_statement(3)
        context = Context()
        root.interpret(context)
        self.assertFalse(context.get_variable(var_defs['IfCondition']))
        self.assertFalse(context.get_variable(var_defs['IfEnter']))
        self.assertTrue(context.get_variable(var_defs['ElseEnter']))

    def test_interpret_elif(self):
        root, var_defs = create_if_statement(4)
        context = Context()
        context.set_variable(var_defs['ElseIfCondition1'], True)
        root.interpret(context)
        self.assertFalse(context.get_variable(var_defs['IfCondition']))
        self.assertFalse(context.get_variable(var_defs['IfEnter']))
        self.assertFalse(context.get_variable(var_defs['ElseEnter']))
        self.assertTrue(context.get_variable(var_defs['ElseIfEnter1']))

    def test_interpret_elif_2(self):
        root, var_defs = create_if_statement(6)
        context = Context()
        context.set_variable(var_defs['ElseIfCondition2'], True)
        root.interpret(context)
        self.assertFalse(context.get_variable(var_defs['IfCondition']))
        self.assertFalse(context.get_variable(var_defs['IfEnter']))
        self.assertFalse(context.get_variable(var_defs['ElseEnter']))
        self.assertFalse(context.get_variable(var_defs['ElseIfEnter1']))
        self.assertTrue(context.get_variable(var_defs['ElseIfEnter2']))
