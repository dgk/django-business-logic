# -*- coding: utf-8 -*-
from django.utils.six import StringIO

from lxml import etree

from .common import *

NAMESPACES = {'xmlns': 'http://www.w3.org/1999/xhtml'}


class BlocklyXmlBuilderConstantTest(TestCase):
    def _constant_test(self, statement, block_type, field_name):
        root = Node.add_root()
        node = root.add_child(content_object=statement)
        xml_str = BlocklyXmlBuilder(node).build()
        xml = etree.parse(StringIO(xml_str))
        block = xml.xpath('/xml/block')
        self.assertEqual(1, len(block))
        block = block[0]
        self.assertEqual(block_type, block.get('type'))
        field = block.find('field')
        self.assertIsNotNone(field)
        self.assertEqual(field_name, field.get('name'))
        self.assertEqual(str(statement.value), field.text)

    def test_integer_constant(self):
        self._constant_test(IntegerConstant(value=112), 'math_number', 'NUM')

    def test_float_constant(self):
        self._constant_test(FloatConstant(value=1.11456), 'math_number', 'NUM')

    def test_string_constant(self):
        self._constant_test(StringConstant(value='hello'), 'text', 'TEXT')


class BlocklyXmlBuilderAssignmentTest(TestCase):
    # https://blockly-demo.appspot.com/static/demos/code/index.html


    def test_assignment(self):
        entry_point = var_A_assign_1()
        assign_node = entry_point.get_children()[1]
        print assign_node
        xml_str = tree_to_blockly_xml(assign_node)
        xml = etree.fromstring(xml_str)
        print(etree.tostring(xml, pretty_print=True))
