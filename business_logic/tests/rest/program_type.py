# -*- coding: utf-8 -*-

from .common import *


class ProgramTypeTest(TestCase):
    def setUp(self):
        self.program_type = ProgramType.objects.create(name='test')
        self.argument = ProgramArgument.objects.create(
            program_type=self.program_type,
            content_type=ContentType.objects.get_for_model(TestModel)
        )
        ProgramArgumentField.objects.create(
            name='int_value',
            program_argument=self.argument,
        )
        ProgramArgumentField.objects.create(
            name='string_value',
            program_argument=self.argument,
        )

        self.client = JSONClient()

    def test_program_type_list(self):
        url = reverse('business-logic:rest:program-type-list')
        response = self.client.get(url)
        self.assertEqual(200, response.status_code)
        _json = json.loads(response.content)
        self.assertIsInstance(_json, list)
        self.assertEqual(1, len(_json))

    def test_program_type_view(self):
        url = reverse('business-logic:rest:program-type', kwargs={'pk': self.program_type.id})
        response = self.client.get(url)
        self.assertEqual(200, response.status_code)
        _json = json.loads(response.content)
        self.assertIsInstance(_json, dict)
        arguments = _json['argument']
        argument = arguments[0]
        fields = argument['field']

        int_field = fields[0]
        self.assertNotIn('program_argument', int_field)
        self.assertIn('schema', int_field)

        schema = int_field['schema']
        self.assertIsInstance(schema, dict)
        self.assertIn('data_type', schema)
        self.assertEqual('int', schema['data_type'])

        string_field = fields[1]
        self.assertNotIn('program_argument', string_field)
        self.assertIn('schema', string_field)

        schema = string_field['schema']
        self.assertIsInstance(schema, dict)
        self.assertIn('data_type', schema)
        self.assertEqual('string', schema['data_type'])




