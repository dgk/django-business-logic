# -*- coding: utf-8 -*-

from .common import *


class ProgramInterfaceTest(TestCase):
    def setUp(self):
        self.program_interface = ProgramInterface.objects.create(code='test')
        self.argument = ProgramArgument.objects.create(
            program_interface=self.program_interface,
            content_type=ContentType.objects.get_for_model(TestModel)
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

        self.client = JSONClient()

    def test_program_interface_list(self):
        url = reverse('business-logic:rest:program-interface-list')
        response = self.client.get(url)
        self.assertEqual(200, response.status_code)
        _json = response_json(response)
        self.assertIsInstance(_json, dict)
        results = _json['results']
        self.assertIsInstance(results, list)
        self.assertEqual(1, len(results))

    def test_program_interface_view(self):
        url = reverse('business-logic:rest:program-interface', kwargs={'pk': self.program_interface.id})
        response = self.client.get(url)
        self.assertEqual(200, response.status_code)
        _json = response_json(response)
        self.assertIsInstance(_json, dict)
        arguments = _json['arguments']
        argument = arguments[0]
        fields = dict((x['name'], x) for x in argument['field'])

        expected = {
            'int_value': dict(
                data_type='number',
                verbose_name='Integer value',
                ),
            'string_value': dict(
                data_type='string',
                verbose_name='string value',
                ),
            'foreign_value': dict(
                data_type='model',
                model='test_app.TestRelatedModel',
                verbose_name='foreign value',
                ),
            'foreign_value.string_value': dict(
                data_type='string',
                verbose_name='foreign value.string value',
                ),

        }
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

            verbose_name = data.get('verbose_name')
            if verbose_name:
                self.assertEqual(verbose_name, schema['verbose_name'])



