# -*- coding: utf-8 -*-

from .common import *


class ProgramVersionRESTTest(TestCase):
    def setUp(self):
        self.client = JSONClient()

        self.program_interface = program_interface = ProgramInterface.objects.create(code='test')

        self.program = program = Program.objects.create(program_interface=program_interface,
                                              title='test',
                                              code='test')

        self.program_version = ProgramVersion.objects.create(program=program, entry_point=variable_assign_value())
        self.xml = BlocklyXmlBuilder().build(self.program_version.entry_point)

    def test_program_version_create(self):
        url = reverse('business-logic:rest:program-version-create')
        response = self.client.post(url, json.dumps(dict(
                program=self.program.id,
                xml=self.xml
            )))
        self.assertEqual(201, response.status_code, response.content)
        _json = response_json(response)
        id = _json['id']
        created = ProgramVersion.objects.get(id=id)
        self.assertFalse(created.is_default)
        self.assertIsInstance(created.entry_point, Node)

    def test_program_version_view(self):
        url = reverse('business-logic:rest:program-version', kwargs=dict(pk=self.program_version.id))
        response = self.client.get(url)
        self.assertEqual(200, response.status_code)
        _json = response_json(response)
        self.assertIsInstance(_json, dict)
        self.assertEqual(self.xml, _json['xml'])

        self.assertEqual(sorted([
            'xml',
            'description',
            'title',
            'creation_time',
            'is_default',
            'modification_time',
            'program',
            'id',
        ]), sorted(_json.keys()))

    @unittest.skip('TODO')
    def test_program_version_update(self):
        #print self.xml
        url = reverse('business-logic:rest:program-version', kwargs=dict(pk=self.program_version.id))
        response = self.client.put(url, json.dumps(dict(
            program=self.program.id,
            xml=self.xml.replace('>1.0<', '>3.0<')
        )))
        self.assertEqual(200, response.status_code, response.content)
        _json = response_json(response)
        self.assertIsInstance(_json, dict)
        self.assertEqual(self.xml, _json['xml'])
