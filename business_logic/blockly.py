# -*- coding: utf-8 -*-

from .models import NodeCacheHolder


class BlocklyXmlBuilder(NodeCacheHolder):
    def __init__(self, tree_root):
        self.tree_root = tree_root
        self.stack = []
        self.xml = None

    def visit(self, node):
        print node.content_type, 'visit'

        pass

    def build(self):
        for child in self.get_children(node):
            self.postorder(child)
        self.visit(node)


def tree_to_blockly_xml(tree_root):
    builder = BlocklyXmlBuilder(tree_root)
    return builder.build()
    return '''<xml xmlns="http://www.w3.org/1999/xhtml">
        <block></block>
        </xml>'''#.format(builder.build())


def blockly_xml_to_tree(xml):
    pass
