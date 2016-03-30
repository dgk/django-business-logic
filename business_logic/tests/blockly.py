# -*- coding: utf-8 -*-

from .common import *

from lxml import etree


class TreeToBlocklyXmlTest(TestCase):
    # https://blockly-demo.appspot.com/static/demos/code/index.html
    def test_assignment(self):
        entry_point = var_A_assign_1()
        assign_node = entry_point.get_children()[1]

        xml_str = tree_to_blockly_xml(assign_node)
        xml = etree.fromstring(xml_str)
        #print(etree.tostring(xml, pretty_print=True))
