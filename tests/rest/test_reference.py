# -*- coding: utf-8 -*-

from .common import *


class ReferenceDescriptorTest(TestCase):
    def setUp(self):
        self.reference_descriptor = ReferenceDescriptor.objects.create(
            content_type=ContentType.objects.get_for_model(TestModel)
        )
        self.client = JSONClient()


    def test_reference_descriptor_list(self):
        url = reverse('business-logic:rest:reference-descriptor-list')
        response = self.client.get(url)
        self.assertEqual(200, response.status_code)
        _json = response_json(response)
        self.assertIsInstance(_json, list)
        self.assertEqual(1, len(_json))

        descriptor = _json[0]
        model = 'test_app.TestModel'
        self.assertEqual(model, descriptor['name'])
        self.assertEqual('Test Model', descriptor['verbose_name'])
        self.assertEqual(reverse('business-logic:rest:reference-list', kwargs=dict(model=model)), descriptor['url'])

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


class ReferenceListTest(TestCase):
    def setUp(self):
        self.reference_descriptor = ReferenceDescriptor.objects.create(
            content_type=ContentType.objects.get_for_model(TestModel)
        )
        self.client = JSONClient()

        model = 'test_app.TestModel'
        self.url = reverse('business-logic:rest:reference-list', kwargs=dict(model=model))

        self.test_models = []

        for i in range(11):
            self.test_models.append(TestModel.objects.create(string_value='str_{}'.format(str(i) * 3)))

    def test_reference_list(self):
        response = self.client.get(self.url)
        self.assertEqual(200, response.status_code)
        _json = response_json(response)
        self.assertIsInstance(_json, dict)
        self.assertEqual(11, len(_json['results']))
        reference = _json['results'][0]
        self.assertEqual(self.test_models[0].id, reference['id'])
        self.assertEqual(str(self.test_models[0]), reference['name'])

    def test_reference_list_search_not_configured(self):
        response = self.client.get(self.url, dict(search='111'))
        self.assertEqual(400, response.status_code)
        _json = response_json(response)
        self.assertEqual(['ReferenceDescriptor for `test_app.TestModel` are not configured: incorrect `search_fields` field'], _json)

    def test_reference_list_search(self):
        self.reference_descriptor.search_fields = 'string_value'
        self.reference_descriptor.save()

        response = self.client.get(self.url, dict(search='111'))
        _json = response_json(response)
        self.assertEqual(1, len(_json['results']))

    def test_reference_list_search_related_fields(self):
        self.reference_descriptor.search_fields = 'foreign_value__string_value'
        self.reference_descriptor.save()

        test_model = self.test_models[2]
        test_related_model = TestRelatedModel.objects.create(string_value='xxx')
        test_model.foreign_value = test_related_model
        test_model.save()

        response = self.client.get(self.url, dict(search='xxx'))
        _json = response_json(response)
        self.assertEqual(1, len(_json['results']))

        reference = _json['results'][0]
        self.assertEqual(test_model.id, reference['id'])


class ReferenceViewTest(TestCase):
    def setUp(self):
        self.reference_descriptor = ReferenceDescriptor.objects.create(
            content_type=ContentType.objects.get_for_model(TestModel)
        )
        self.client = JSONClient()

        model = 'test_app.TestModel'
        self.test_model = TestModel.objects.create(string_value='str_value')

        self.url = reverse('business-logic:rest:reference', kwargs=dict(model=model, pk=self.test_model.id))

    def test_reference_view(self):
        response = self.client.get(self.url)
        self.assertEqual(200, response.status_code)
        _json = response_json(response)
        self.assertIsInstance(_json, dict)
        self.assertEqual(self.test_model.id, _json['id'])
        self.assertEqual(str(self.test_model), _json['name'])

