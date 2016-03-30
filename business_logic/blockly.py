# -*- coding: utf-8 -*-

from .models import NodeVisitor


class XmlBuilderVisitor(NodeVisitor):
    def __init__(self):
        self.clone = None

    def visit(self, node):
        #print node, 'visit'
        pass

def tree_to_blockly_xml(tree_root):
    visitor = XmlBuilderVisitor()
    visitor.postorder(tree_root)

    return '''<xml xmlns="http://www.w3.org/1999/xhtml">
        <block></block>
        </xml>'''


def blockly_xml_to_tree(xml):
    pass
