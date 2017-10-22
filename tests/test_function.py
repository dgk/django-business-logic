# -*- coding: utf-8 -*-
#

from .common import *


def not_builtin_bin(x):
    return bin(int(x))


def bin_with_context(ctx, x):
    return (ctx, bin(int(x)))


class PythonModuleFunctionTest(TestCase):
    def test_import(self):
        context = Context()
        root = Node.add_root()
        func_def = PythonModuleFunctionDefinition(module=__name__, function='not_builtin_bin')
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
        func_def = PythonModuleFunctionDefinition(module=__name__, function='bin_with_context',
                                                  is_context_required=True)
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
    def test_arguments(self):
        context = Context()
        root = Node.add_root()
        function_definition = PythonCodeFunctionDefinition.objects.create(code='''
def function(arg1, another_arg):
    return str(abs(another_arg))
''')
        for i, argument_name in enumerate(('arg1', 'another_arg')):
            FunctionArgument.objects.create(name=argument_name, order=i, function=function_definition)


        root.add_child(content_object=function_definition)
        root = Node.objects.get(id=root.id)
        func = Function(definition=function_definition)
        func_node = root.add_child(content_object=func)

        for arg in (NumberConstant(value=-5.0), NumberConstant(value=-3.0)):
            func_node.add_child(content_object=arg)
            func_node = Node.objects.get(id=func_node.id)

        result = func_node.interpret(context)
        self.failUnlessEqual('3.0', result)

    def test_context_in_function(self):
        context = Context()
        root = Node.add_root()
        function_definition = PythonCodeFunctionDefinition.objects.create(code='''
def function(context, arg1, another_arg):
    return (context, str(abs(another_arg)))
        ''', is_context_required=True)
        for i, argument_name in enumerate(('arg1', 'another_arg')):
            FunctionArgument.objects.create(name=argument_name, order=i, function=function_definition)

        root.add_child(content_object=function_definition)
        root = Node.objects.get(id=root.id)
        func = Function(definition=function_definition)
        func_node = root.add_child(content_object=func)

        for arg in (NumberConstant(value=-5.0), NumberConstant(value=-3.0)):
            func_node.add_child(content_object=arg)
            func_node = Node.objects.get(id=func_node.id)

        result = func_node.interpret(context)
        self.failUnlessEqual((context, '3.0'), result)
