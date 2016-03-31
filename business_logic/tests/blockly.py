# -*- coding: utf-8 -*-
from django.utils.six import StringIO

from lxml import etree

from .common import *

NAMESPACES = {'xmlns': 'http://www.w3.org/1999/xhtml'}


class TreeToBlocklyXmlTest(TestCase):
    # https://blockly-demo.appspot.com/static/demos/code/index.html

    def test_integer_const(self):
        root = Node.add_root()
        statement1 = IntegerConstant(value=1)
        node1 = root.add_child(content_object=statement1)
        xml_str = BlocklyXmlBuilder(node1).build()

        xml = etree.parse(StringIO(xml_str))

        #print(etree.tostring(xml, pretty_print=True))
        block_node = xml.xpath('/xml/block')
        self.assertEqual(1, len(block_node))

    def test_assignment(self):
        entry_point = var_A_assign_1()
        assign_node = entry_point.get_children()[1]

        xml_str = tree_to_blockly_xml(assign_node)
        xml = etree.fromstring(xml_str)
        #print(etree.tostring(xml, pretty_print=True))
