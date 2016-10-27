# -*- coding: utf-8 -*-

from .common import *


class ProgramTest(ProgramTestBase):
    def test_program_argument_variable_definition(self):
        self.assertIsInstance(self.argument.variable_definition, VariableDefinition)
        self.assertEqual(self.argument.name, self.argument.variable_definition.name)

    def test_program_argument_field_variable_definition(self):
        int_value_field = self.fields['int_value']
        self.assertIsInstance(int_value_field.variable_definition, VariableDefinition)
        self.assertEqual('{}.{}'.format(self.argument.name, 'int_value'),
                         int_value_field.variable_definition.name)

    def test_program_argument_field_title_declared(self):
        title = 'test'
        field = self.fields['int_value']
        field.title = title
        field.save()

        self.assertEqual(title, field.get_title())

    def test_program_argument_field_title_generated(self):
        self.assertEqual('Test Model.Integer value', self.fields['int_value'].get_title())
        self.assertEqual('Test Model.foreign value', self.fields['foreign_value'].get_title())
        self.assertEqual('Test Model.foreign value.string value', self.fields['foreign_value.string_value'].get_title())

    def test_save_program_argument_change_variable_definition(self):
        self.argument.name = 'new_name'
        self.argument.save()
        variable_definition = VariableDefinition.objects.get(id=self.argument.variable_definition_id)
        self.assertEqual(self.argument.name, variable_definition.name)

    def test_save_program_argument_change_field_variable_definition(self):
        int_value_field = self.fields['int_value']
        self.argument.name = 'new_name'
        self.argument.save()
        variable_definition = VariableDefinition.objects.get(id=int_value_field.variable_definition_id)

        self.assertEqual('{}.{}'.format(self.argument.name, 'int_value'),
                         variable_definition.name)

    def test_program_argument_deletion_should_delete_variable_definition(self):
        variable_definition = self.argument.variable_definition
        self.argument.delete()
        self.assertFalse(VariableDefinition.objects.filter(id=variable_definition.id).count())

    def test_program_argument_deletion_should_delete_field(self):
        int_value_field = self.fields['int_value']
        variable_definition = int_value_field.variable_definition
        self.argument.delete()
        self.assertFalse(ProgramArgumentField.objects.filter(id=int_value_field.id).count())
        self.assertFalse(VariableDefinition.objects.filter(id=variable_definition.id).count())

    def test_program_argument_field_deletion_should_delete_variable_definition(self):
        int_value_field = self.fields['int_value']
        variable_definition = int_value_field.variable_definition
        int_value_field.delete()
        self.assertFalse(VariableDefinition.objects.filter(id=variable_definition.id).count())

    def test_program_execute(self):
        result = self.program_version.execute(test_model=self.test_model)
        self.assertIsInstance(result, Context)
        self.assertIs(self.test_model, result.get_variable(self.argument.variable_definition))
        variable_definition = VariableDefinition.objects.get(name='A')
        self.assertEqual(1 + 2 * 3, result.get_variable(variable_definition))

    def test_program_version_execute_args_check(self):
        for kwargs in [
            dict(test_model=1),
            dict(test_model=self.test_model, xxx=1),
            dict(tes_moddddel=self.test_model),
            {},
        ]:
            with self.assertRaises(Exception) as exc:
                self.program_version.execute(**kwargs)

    def test_program_version_execute_set_variable(self):
        int_value_field = self.fields['int_value']
        variable_definition = int_value_field.variable_definition
        value = 5
        self.program_version.entry_point = variable_assign_value(value=NumberConstant(value=value),
                                                                 variable_definition=variable_definition)
        self.program_version.save()

        context = self.program_version.execute(test_model=self.test_model)
        self.assertEqual(value, context.get_variable(variable_definition))
        self.assertEqual(value, self.test_model.int_value)

    def test_program_version_execute_set_reference_variable(self):
        int_value_field = self.fields['foreign_value']
        variable_definition = int_value_field.variable_definition
        test_related_model = TestRelatedModel.objects.create()

        parent = Node.add_root()
        assignment_node = parent.add_child(content_object=Assignment())
        variable = Variable(definition=variable_definition)
        var_node = assignment_node.add_child(content_object=variable)

        constant_node = assignment_node.add_child(content_object=ReferenceConstant())

        constant_node.add_child(content_object=test_related_model)


        parent = Node.objects.get(id=parent.id)

        self.program_version.entry_point = parent
        self.program_version.save()

        context = self.program_version.execute(test_model=self.test_model)

        self.test_model.save()
        self.test_model = TestModel.objects.get(id=self.test_model.id)

        self.assertEqual(test_related_model, context.get_variable(variable_definition))
        self.assertEqual(test_related_model, self.test_model.foreign_value)

    def test_program_version_execute_get_variable_recursive(self):
        int_value_field = self.fields['foreign_value.int_value']
        variable_definition = int_value_field.variable_definition

        self.program_version.entry_point = variable_assign_value(value=Variable(definition=variable_definition),
                                                                 variable_definition=variable_definition)
        self.program_version.save()

        self.test_model.foreign_value = TestRelatedModel.objects.create()
        self.test_model.save()

        context = self.program_version.execute(test_model=self.test_model)

    def test_recursive_get_variable_should_returns_undefined_if_parent_field_undefined(self):
        int_value_field = self.fields['int_value']
        foreign_value_int_value_field = self.fields['foreign_value.int_value']

        self.program_version.entry_point = variable_assign_value(
            value=Variable(definition=foreign_value_int_value_field.variable_definition),
            variable_definition=int_value_field.variable_definition)
        self.program_version.save()

        context = self.program_version.execute(test_model=self.test_model)

        self.assertIsInstance(context.get_variable(foreign_value_int_value_field.variable_definition),
                              Variable.Undefined)
        self.assertIsNone(context.get_variable(int_value_field.variable_definition))
        self.assertIsNone(self.test_model.int_value)


class ProgramAdminTest(ProgramTestBase):
    def setUp(self):
        super(ProgramAdminTest, self).setUp()
        self.superuser = User.objects.create_superuser('test', 't@e.st', 'test')
        self.client = Client()
        self.client.login(username='test', password='test')

    def test_programinterface_changelist(self):
        url = reverse('admin:business_logic_programinterface_changelist')
        self.client.get(url)