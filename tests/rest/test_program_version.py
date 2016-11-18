# -*- coding: utf-8 -*-

from .common import *


class ProgramVersionRESTTest(TestCase):
    def setUp(self):
        self.client = JSONClient()

        self.program_interface = program_interface = ProgramInterface.objects.create(code='test')

        self.program = program = Program.objects.create(
            program_interface=program_interface,
            title='test',
            code='test'
        )

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
            'environment',
            'id',
        ]), sorted(_json.keys()))

    def test_program_version_update(self):
        url = reverse('business-logic:rest:program-version', kwargs=dict(pk=self.program_version.id))
        old_entry_point_id = self.program_version.entry_point_id
        xml = self.xml.replace('>1.0<', '>3.0<')
        response = self.client.put(url, json.dumps(dict(
            program=self.program.id,
            xml=xml
        )))
        self.assertEqual(200, response.status_code, response.content)
        _json = response_json(response)
        self.assertIsInstance(_json, dict)
        self.assertEqual(cleanup_xml_ids(xml), cleanup_xml_ids(_json['xml']))

        response = self.client.get(url)
        _json = response_json(response)

        program_version = ProgramVersion.objects.get(id=self.program_version.id)
        self.assertNotEqual(old_entry_point_id, program_version.entry_point_id)

        self.assertFalse(Node.objects.filter(id=old_entry_point_id))

    def test_program_version_update_should_validate_xml(self):
        url = reverse('business-logic:rest:program-version', kwargs=dict(pk=self.program_version.id))
        xml = self.xml.replace('>1.0<', '>1.0<<')
        response = self.client.put(url, json.dumps(dict(
            program=self.program.id,
            xml=xml
        )))
        self.assertEqual(400, response.status_code, response.content)

    def test_program_version_update_should_validate_empty_xml(self):
        url = reverse('business-logic:rest:program-version', kwargs=dict(pk=self.program_version.id))
        response = self.client.put(url, json.dumps(dict(
            program=self.program.id,
            xml=' \n    '
        )))

        self.assertEqual(400, response.status_code, response.content)

        _json = response_json(response)
        self.assertNotIn('XMLSyntaxError:', _json['xml'][0])
