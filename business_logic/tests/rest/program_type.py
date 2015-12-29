# -*- coding: utf-8 -*-

from .common import *


class ProgramTypeTest(TestCase):
    def setUp(self):
        self.program_type = ProgramType.objects.create(name='test')
        self.argument = ProgramArgument.objects.create(
            program_type=self.program_type,
            content_type=ContentType.objects.get_for_model(TestModel)
        )

        field_list = (
            'int_value',
            'string_value',
            'foreign_value',
        )
        for field in field_list:
            ProgramArgumentField.objects.create(
                name=field,
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
        fields = dict((x['name'], x) for x in argument['field'])

        expected = dict(
            int_value=dict(data_type='int'),
            string_value=dict(data_type='string'),
            foreign_value=dict(
                data_type='model',
                model='test_app.TestRelatedModel',
                ),
        )

        for field_name, data in expected.items():
            field = fields[field_name]
            self.assertNotIn('program_argument', field)
            self.assertIn('schema', field)
            self.assertEqual(field_name, field['name'])

            schema = field['schema']
            self.assertIsInstance(schema, dict)
            self.assertIn('data_type', schema)
            self.assertEqual(data['data_type'], schema['data_type'])
            model = data.get('model')
            if model:
                self.assertEqual(model, schema['model'])


