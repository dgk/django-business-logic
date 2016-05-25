# -*- coding: utf-8 -*-
#

from .common import *

def _bin(x):
    return bin(int(x))

def context_bin(ctx, x):
    return (ctx, bin(int(x)))

class FunctionTest(TestCase):
    def test_import(self):
        context = Context()
        root = Node.add_root()
        func_def = FunctionDefinition(module='business_logic.tests.function', function='_bin')
        root.add_child(content_object=func_def)
        root = Node.objects.get(id=root.id)
        func = Function(definition=func_def)
        func_node = root.add_child(content_object=func)
        func_node.add_child(content_object=NumberConstant(value=3))
        root = Node.objects.get(id=root.id)
        result = root.interpret(context)
        self.failUnlessEqual(result[1], '0b11')

    def test_context_in_function(self):
        context = Context()
        root = Node.add_root()
        func_def = FunctionDefinition(module='tests.test_function',
                function='context_bin', context_required=True)
        root.add_child(content_object=func_def)
        root = Node.objects.get(id=root.id)
        func = Function(definition=func_def)
        func_node = root.add_child(content_object=func)
        func_node.add_child(content_object=NumberConstant(value=3))
        root = Node.objects.get(id=root.id)
        func = Function(definition=func_def)
        result = root.interpret(context)
        self.failUnlessEqual(result[1], (context, '0b11'))


    def test_builtins(self):
        context = Context()
        root = Node.add_root()
        func_def = FunctionDefinition(module='__builtins__', function='str')
        root.add_child(content_object=func_def)
        root = Node.objects.get(id=root.id)
        func = Function(definition=func_def)
        func_node = root.add_child(content_object=func)
        func_node.add_child(content_object=NumberConstant(value=3.0))
        root = Node.objects.get(id=root.id)
        result = root.interpret(context)
        self.failUnlessEqual(result[1], '3.0')

    def test_builtins_if_empty_module(self):
        context = Context()
        root = Node.add_root()
        func_def = FunctionDefinition(module='', function='str')
        root.add_child(content_object=func_def)
        root = Node.objects.get(id=root.id)
        func = Function(definition=func_def)
        func_node = root.add_child(content_object=func)
        func_node.add_child(content_object=NumberConstant(value=3.0))
        root = Node.objects.get(id=root.id)
        result = root.interpret(context)
        self.failUnlessEqual(result[1], '3.0')

