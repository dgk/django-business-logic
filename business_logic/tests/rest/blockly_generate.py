# -*- coding: utf-8 -*-

from .common import *

from lxml import etree


class BlocklyGenerateTest(TestCase):
    def setUp(self):
        self.client = JSONClient()

        self.program_type = program_type = ProgramType.objects.create(name='test')

        self.program = program = Program.objects.create(program_type=program_type,
                                              title='test',
                                              name='test')

        self.program_version = ProgramVersion.objects.create(program=program, entry_point=variable_assign_value())

    def test_xml_A_assign_1(self):
        url = reverse('business-logic:rest:program-version', kwargs=dict(pk=self.program_version.id))
        response = self.client.get(url)
        self.assertEqual(200, response.status_code)
        tree = etree.fromstring(response.content)
        self.assertEqual('xml', tree.tag)
        self.assertEqual(1, len(tree.xpath('./block')))


