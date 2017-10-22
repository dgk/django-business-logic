# -*- coding: utf-8 -*-
from .common import *


class ExecutionRestTest(ProgramRestTestBase):

    def setUp(self):
        super(ExecutionRestTest, self).setUp()
        context = Context(log=True, debug=True)
        self.program_version.execute(test_model=self.test_model, context=context)

    def test_execution_list_empty(self):
        Execution.objects.all().delete()
        url = reverse('business-logic:rest:execution-list')
        response = self.client.get(url)
        self.assertEqual(200, response.status_code, response.content)
        _json = response_json(response)
        self.assertEqual([], _json['results'])
        self.assertEqual(0, _json['count'])

    def test_execution_list(self):
        url = reverse('business-logic:rest:execution-list')
        response = self.client.get(url)
        self.assertEqual(200, response.status_code, response.content)
        _json = response_json(response)
        self.assertEqual(1, _json['count'])

        result = _json['results'][0]
        self.assertEqual(sorted(['id', 'finish_time', 'start_time', 'program_version']), sorted(result.keys()))

    def test_execution_item(self):
        url = reverse('business-logic:rest:execution', kwargs=dict(pk=Execution.objects.get().id))
        response = self.client.get(url)
        self.assertEqual(200, response.status_code, response.content)
        _json = response_json(response)
        self.assertIn('arguments', _json.keys())
        argument = _json['arguments'][0]
        self.assertEqual('test_model', argument['name'])
        self.assertEqual(Model._meta.verbose_name, argument['verbose_name'])
        content_type = argument['content_type']
        self.assertEqual('test_app.Model', content_type['name'])
        self.assertEqual(ContentType.objects.get_for_model(Model).id, content_type['id'])

        self.assertEqual(self.test_model.id, argument['object_id'])


class LogRestTest(ProgramRestTestBase):

    def setUp(self):
        super(LogRestTest, self).setUp()
        self.context = Context(log=True, debug=True)
        self.program_version.execute(test_model=self.test_model, context=self.context)

    def test_log(self):
        url = reverse('business-logic:rest:log', kwargs=dict(execution__id=Execution.objects.get().id))
        response = self.client.get(url)
        self.assertEqual(200, response.status_code, response.content)
        _json = response_json(response)

        self.assertEqual(self.context.execution.log.node.id, _json['node'])

        for log_entry in (_json, _json['children'][0]):
            self.assertNotIn('id', log_entry)
            self.assertEqual(
                sorted(['node', 'previous_value', 'current_value', 'exception', 'children']), sorted(log_entry.keys()))

            self.assertIsInstance(log_entry['children'], list)
