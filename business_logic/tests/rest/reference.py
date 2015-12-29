# -*- coding: utf-8 -*-

from .common import *


class ReferenceTest(TestCase):
    def setUp(self):
        self.reference_descriptor = ReferenceDescriptor.objects.create(
            content_type=ContentType.objects.get_for_model(TestModel)
        )
        self.client = JSONClient()

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
