# -*- coding: utf-8 -*-

from .common import *


class ProgramInterfaceTest(ProgramRestTestBase):
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
        self.assertEqual('test_model', argument['name'])
        self.assertEqual(TestModel._meta.verbose_name, argument['verbose_name'])
        self.assertEqual('test_app.TestModel', argument['content_type'])

        fields = dict((x['name'], x) for x in argument['fields'])

        expected = {
            'int_value': dict(
                data_type='number',
                verbose_name='Test Model.Integer value',
                ),
            'string_value': dict(
                data_type='string',
                verbose_name='Test Model.string value',
                ),
            'foreign_value': dict(
                data_type='model',
                content_type='test_app.TestRelatedModel',
                verbose_name='Test Model.foreign value',
                ),
            'foreign_value.string_value': dict(
                data_type='string',
                verbose_name='Test Model.foreign value.string value',
                ),

        }
        for field_name, data in expected.items():
            field = fields[field_name]
            self.assertNotIn('program_argument', field)
            self.assertEqual(field_name, field['name'])

            self.assertIsInstance(field, dict)
            self.assertIn('data_type', field)
            self.assertEqual(data['data_type'], field['data_type'])
            content_type = data.get('content_type')
            self.assertEqual(content_type, field['content_type'])
            verbose_name = data.get('verbose_name')
            self.assertEqual(verbose_name, field['verbose_name'])



