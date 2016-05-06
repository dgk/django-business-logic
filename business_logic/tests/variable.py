# -*- coding: utf-8 -*-
#

from .common import *
# also see .assignment


class VariableTest(TestCase):
    def test_definition(self):
        context = Context()
        root = Node.add_root()
        var_def = VariableDefinition(name='K1')
        root.add_child(content_object=var_def)
        var = Variable(definition=var_def)
        var_node = root.add_child(content_object=var)
        result = root.interpret(context)

    def test_variable_undefined(self):
        undefined = Variable.Undefined()
        self.failIf(undefined)

    def test_get_variable_returns_variable_undefined(self):
        context = Context()
        root = Node.add_root()
        var_def = VariableDefinition(name='K1')
        root.add_child(content_object=var_def)
        root.interpret(context)
        self.assertIsInstance(context.get_variable(var_def), Variable.Undefined)

    def test_get_variable_returns_recursive_attribute(self):
        int_value = 8
        string_value = 'hello'

        test_model_variable_definition = VariableDefinition.objects.create(name='test_model')

        test_model_foreign_value_string_value_variable_definition = VariableDefinition.objects.create(
            name='test_model.foreign_value.string_value')

        test_model_int_value_variable_definition = VariableDefinition.objects.create(name='test_model.int_value')

        test_related_model = TestRelatedModel.objects.create(string_value=string_value)
        test_model = TestModel.objects.create(int_value=int_value, foreign_value=test_related_model)

        context = Context()
        context.set_variable(test_model_variable_definition, test_model)

        self.assertEqual(int_value, context.get_variable(test_model_int_value_variable_definition))
        self.assertEqual(string_value, context.get_variable(test_model_foreign_value_string_value_variable_definition))

    def test_get_variable_returns_recursive_attribute_undefined(self):
        test_model_variable_definition = VariableDefinition.objects.create(name='test_model')

        variable_definitions = {}

        for field in (
                'test_model.int_value',
                'test_model.not_exists',
                'test_model.foreign_value.string_value',
                'test_model.foreign_value.not_exists',

        ):
            variable_definitions[field] = VariableDefinition.objects.create(name=field)

        context = Context()

        for variable_definition in variable_definitions.values():
            self.assertIsInstance(context.get_variable(variable_definition), Variable.Undefined)

        test_model = TestModel.objects.create()
        context.set_variable(test_model_variable_definition, test_model)

        for field, variable_definition in variable_definitions.items():
            if field == 'test_model.int_value':
                continue

            self.assertIsInstance(context.get_variable(variable_definition), Variable.Undefined)
