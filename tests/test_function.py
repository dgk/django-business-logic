# -*- coding: utf-8 -*-
#

from .common import *


def _bin(x):
    return bin(int(x))


def context_bin(ctx, x):
    return (ctx, bin(int(x)))


class PythonModuleFunctionTest(TestCase):
    def test_import(self):
        context = Context()
        root = Node.add_root()
        func_def = PythonModuleFunctionDefinition(module=__name__, function='_bin')
        root.add_child(content_object=func_def)
        root = Node.objects.get(id=root.id)
        func = Function(definition=func_def)
        func_node = root.add_child(content_object=func)
        func_node.add_child(content_object=NumberConstant(value=3))
        result = func_node.interpret(context)
        self.failUnlessEqual(result, '0b11')

    def test_context_in_function(self):
        context = Context()
        root = Node.add_root()
        func_def = PythonModuleFunctionDefinition(module=__name__, function='context_bin', is_context_required=True)
        root.add_child(content_object=func_def)
        root = Node.objects.get(id=root.id)
        func = Function(definition=func_def)
        func_node = root.add_child(content_object=func)
        func_node.add_child(content_object=NumberConstant(value=3))
        result = func_node.interpret(context)
        self.failUnlessEqual(result, (context, '0b11'))

    def test_builtins(self):
        context = Context()
        root = Node.add_root()
        func_def = PythonModuleFunctionDefinition(module='__builtins__', function='str')
        root.add_child(content_object=func_def)
        root = Node.objects.get(id=root.id)
        func = Function(definition=func_def)
        func_node = root.add_child(content_object=func)
        func_node.add_child(content_object=NumberConstant(value=3.0))
        result = func_node.interpret(context)
        self.failUnlessEqual(result, '3.0')

    def test_builtins_if_empty_module(self):
        context = Context()
        root = Node.add_root()
        func_def = PythonModuleFunctionDefinition(module='', function='str')
        root.add_child(content_object=func_def)
        root = Node.objects.get(id=root.id)
        func = Function(definition=func_def)
        func_node = root.add_child(content_object=func)
        func_node.add_child(content_object=NumberConstant(value=3.0))
        result = func_node.interpret(context)
        self.failUnlessEqual(result, '3.0')


class PythonCodeFunctionTest(TestCase):
    def test_import(self):
        context = Context()
        root = Node.add_root()
        func_def = PythonCodeFunctionDefinition(code='''
def function(arg):
    return str(abs(arg))
''')
        root.add_child(content_object=func_def)
        root = Node.objects.get(id=root.id)
        func = Function(definition=func_def)
        func_node = root.add_child(content_object=func)
        func_node.add_child(content_object=NumberConstant(value=-3.0))
        result = func_node.interpret(context)
        self.failUnlessEqual(result, '3.0')
