# -*- coding: utf-8 -*-

from .common import *

from lxml import etree

class NodeXMLTest(TestCase):
    def test(self):
        entry_point = var_A_assign_1()
        assign_node = entry_point.get_children()[1]
        xml = tree_to_blockly_xml(assign_node)

        print(etree.tostring(xml, pretty_print=True))
        class Visitor:
            def __init__(self):
                self.visited = []

            def visit(self, visited):
                self.visited.append(visited.content_object)

        visitor = Visitor()

        entry_point.traverse(visitor)
        print visitor.visited