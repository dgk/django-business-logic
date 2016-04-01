# -*- coding: utf-8 -*-
from django.utils.six import StringIO

from lxml import etree

from .common import *

NAMESPACES = {'xmlns': 'http://www.w3.org/1999/xhtml'}


class TreeToBlocklyXmlTest(TestCase):
    # https://blockly-demo.appspot.com/static/demos/code/index.html

    def test_integer_const(self):
        root = Node.add_root()
        statement = IntegerConstant(value=1)
        node = root.add_child(content_object=statement)
        xml_str = BlocklyXmlBuilder(node).build()

        xml = etree.parse(StringIO(xml_str))

        block = xml.xpath('/xml/block')
        self.assertEqual(1, len(block))
        block = block[0]
        self.assertEqual('math_number', block.get('type'))
        field = block.find('field')
        self.assertIsNotNone(field)
        self.assertEqual('NUM', field.get('name'))
        self.assertEqual('1', field.text)

    def test_string_const(self):
        root = Node.add_root()
        statement = StringConstant(value='hello')
        node = root.add_child(content_object=statement)
        xml_str = BlocklyXmlBuilder(node).build()

        xml = etree.parse(StringIO(xml_str))

        #print(etree.tostring(xml, pretty_print=True))
        block = xml.xpath('/xml/block')
        self.assertEqual(1, len(block))
        block = block[0]
        self.assertEqual('text', block.get('type'))
        field = block.find('field')
        self.assertIsNotNone(field)
        self.assertEqual('TEXT', field.get('name'))
        self.assertEqual('hello', field.text)

    def test_assignment(self):
        entry_point = var_A_assign_1()
        assign_node = entry_point.get_children()[1]

        xml_str = tree_to_blockly_xml(assign_node)
        xml = etree.fromstring(xml_str)
        #print(etree.tostring(xml, pretty_print=True))
