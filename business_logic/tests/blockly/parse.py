# -*- coding: utf-8 -*-

from django.utils.six import StringIO

from lxml import etree

from business_logic.tests.common import *


class BlocklyXmlParserConstantTest(TestCase):
    def test(self):
        root = Node.add_root()
        node = root.add_child(content_object=StringConstant(value='hello'))
        print Node.dump_bulk(node)
        xml_str = BlocklyXmlBuilder().build(node)

        new_root = BlocklyXmlParser().parse(xml_str)
        self.assertIsInstance(new_root, Node)

