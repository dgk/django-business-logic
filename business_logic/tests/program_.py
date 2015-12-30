# -*- coding: utf-8 -*-

from .common import *


class ProgramTest(TestCase):
    def setUp(self):
        self.program_type = program_type = ProgramType.objects.create(name='test')
        self.argument = ProgramArgument.objects.create(
            program_type=self.program_type,
            content_type=ContentType.objects.get_for_model(TestModel),
            name='test_model'
        )

        field_list = (
            'int_value',
            'string_value',
            'foreign_value',
            'foreign_value.string_value',
        )

        for field in field_list:
            ProgramArgumentField.objects.create(
                name=field,
                program_argument=self.argument,
            )

        self.program = program = Program.objects.create(program_type=program_type,
                                              title='test',
                                              name='test')
        self.program_version = ProgramVersion.objects.create(program=program,
                                                             entry_point=get_test_tree())

        self.test_model = TestModel.objects.create()

    def test_program_argument_variable_definition(self):
        self.assertIsNotNone(self.argument.variable_definition)

    def test_save_program_argument_change_variable_definition(self):
        self.argument.name = 'new_name'
        self.argument.save()
        variable_definition = VariableDefinition.objects.get(id=self.argument.variable_definition_id)
        self.assertEqual(self.argument.name, variable_definition.name)

    def test_program_argument_deletion_should_delete_variable_definition(self):
        variable_definition = self.argument.variable_definition
        self.argument.delete()
        self.assertFalse(VariableDefinition.objects.filter(id=variable_definition.id).count())

    def test_program_interpret(self):
        result = self.program_version.interpret(test_model=self.test_model)
        self.assertIsInstance(result, Context)
        self.assertIs(self.test_model, result.get_variable(self.argument.variable_definition_id))
        variable_definition = VariableDefinition.objects.get(name='A')
        self.assertEqual(1 + 2 * 3, result.get_variable(variable_definition.id))

    def test_program_args_check(self):
        for kwargs in [
            dict(test_model=1),
            dict(test_model=self.test_model, xxx=1),
            dict(tes_moddddel=self.test_model),
            {},
        ]:

            with self.assertRaises(Exception) as exc:
                self.program_version.interpret(**kwargs)

