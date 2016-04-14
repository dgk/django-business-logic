# -*- coding: utf-8 -*-

from django.utils.six import StringIO

from lxml import etree

from business_logic.tests.common import *
from pprint import pprint

class BlocklyXmlParserConstantTest(TestCase):
    def build_xml(self, node):
        xml_str = BlocklyXmlBuilder().build(node)
        xml_str = xml_str.replace('<xml>', '<xml xmlns="http://www.w3.org/1999/xhtml">')
        return xml_str

    def test_string_constant(self):
        root = Node.add_root()
        node = root.add_child(content_object=StringConstant(value='hello'))
        xml_str = self.build_xml(node)
        parsed = BlocklyXmlParser().parse(xml_str)
        self.assertIsInstance(parsed, list)
        self.assertEqual(1, len(parsed))

        constant = parsed[0]
        self.assertIsInstance(constant, dict)
        constant_data = constant['data']
        self.assertEqual(BlocklyXmlParser.get_content_type_id(StringConstant), constant_data['content_type'])
        self.assertEqual('hello', constant_data['value'])

    def test_assignment(self):
        entry_point = variable_assign_value()
        node = entry_point.get_children()[1]

        xml_str = self.build_xml(node)
        parsed = BlocklyXmlParser().parse(xml_str)

        self.assertIsInstance(parsed, list)
        self.assertEqual(1, len(parsed))
        root = parsed[0]

        assignment = root['data']
        self.assertIsInstance(assignment, dict)
        self.assertEqual(BlocklyXmlParser.get_content_type_id(Assignment), assignment['content_type'])

        children = root['children']
        self.assertIsInstance(children, list)
        self.assertEqual(2, len(children))

        variable, constant = children

        self.assertIsInstance(variable, dict)
        variable_data = variable['data']
        self.assertEqual(BlocklyXmlParser.get_content_type_id(Variable), variable_data['content_type'])
        self.assertEqual('A', variable_data['name'])


        self.assertIsInstance(constant, dict)
        constant_data = constant['data']
        self.assertEqual(BlocklyXmlParser.get_content_type_id(FloatConstant), constant_data['content_type'])
        self.assertEqual(1, constant_data['value'])


