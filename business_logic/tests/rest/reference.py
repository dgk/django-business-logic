# -*- coding: utf-8 -*-

from .common import *


class ReferenceTest(TestCase):
    def setUp(self):
        self.reference_descriptor = ReferenceDescriptor.objects.create(
            content_type=ContentType.objects.get_for_model(TestModel)
        )
        self.client = JSONClient()

        self.test_model = TestModel.objects.create(string_value='str')

    def test_reference_descriptor_list(self):
        url = reverse('business-logic:rest:reference-descriptor-list')
        response = self.client.get(url)
        self.assertEqual(200, response.status_code)
        _json = json.loads(response.content)
        self.assertIsInstance(_json, list)
        self.assertEqual(1, len(_json))

        descriptor = _json[0]
        model = 'business_logic.TestModel'
        self.assertEqual(model, descriptor['name'])
        self.assertEqual('test model', descriptor['verbose_name'])
        self.assertEqual(reverse('business-logic:rest:reference-list', kwargs=dict(model=model)), descriptor['url'])

    def test_reference_list(self):
        model = 'business_logic.TestModel'
        url = reverse('business-logic:rest:reference-list', kwargs=dict(model=model))

        response = self.client.get(url)
        self.assertEqual(200, response.status_code)
        _json = json.loads(response.content)
        self.assertIsInstance(_json, dict)
        self.assertEqual(1, len(_json['results']))
        reference = _json['results'][0]
        self.assertEqual(self.test_model.id, reference['id'])
        self.assertEqual(str(self.test_model), reference['name'])

    def test_unregistered_reference_list_not_found(self):
        model = 'business_logic.ReferenceDescriptor'
        url = reverse('business-logic:rest:reference-list', kwargs=dict(model=model))
        response = self.client.get(url)
        self.assertEqual(404, response.status_code)

    def test_notexists_model_not_found(self):
        for model in ('ooo.XXX', 'password'):
            url = reverse('business-logic:rest:reference-list', kwargs=dict(model=model))
            response = self.client.get(url)
            self.assertEqual(404, response.status_code)

