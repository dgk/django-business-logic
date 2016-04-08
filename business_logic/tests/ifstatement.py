# -*- coding: utf-8 -*-
#

from .common import *


class IfStatementTest(TestCase):
    def test_interpret_if(self):
        root, var_defs = create_if_statement(2)
        context = Context()
        context.set_variable(var_defs['IfCondition'].id, True)
        root.interpret(context)
        self.failUnless(context.get_variable(var_defs['IfCondition'].id))
        self.failUnless(context.get_variable(var_defs['IfEnter'].id))
        self.failIf(context.get_variable(var_defs['ElseEnter'].id))

    def test_interpret_if_else(self):
        root, var_defs = create_if_statement(3)
        context = Context()
        root.interpret(context)
        self.failIf(context.get_variable(var_defs['IfCondition'].id))
        self.failIf(context.get_variable(var_defs['IfEnter'].id))
        self.failUnless(context.get_variable(var_defs['ElseEnter'].id))

    def test_interpret_elif(self):
        root, var_defs = create_if_statement(4)
        context = Context()
        context.set_variable(var_defs['ElseIfCondition1'].id, True)
        root.interpret(context)
        self.failIf(context.get_variable(var_defs['IfCondition'].id))
        self.failIf(context.get_variable(var_defs['IfEnter'].id))
        self.failIf(context.get_variable(var_defs['ElseEnter'].id))
        self.failUnless(context.get_variable(var_defs['ElseIfEnter1'].id))

    def test_interpret_elif_2(self):
        root, var_defs = create_if_statement(6)
        context = Context()
        context.set_variable(var_defs['ElseIfCondition2'].id, True)
        root.interpret(context)
        self.failIf(context.get_variable(var_defs['IfCondition'].id))
        self.failIf(context.get_variable(var_defs['IfEnter'].id))
        self.failIf(context.get_variable(var_defs['ElseEnter'].id))
        self.failIf(context.get_variable(var_defs['ElseIfEnter1'].id))
        self.failUnless(context.get_variable(var_defs['ElseIfEnter2'].id))
