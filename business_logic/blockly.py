# -*- coding: utf-8 -*-
import re
import inspect
from lxml import etree

from django.db.models import Model

from .models import *


def camel_case_to_snake_case(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


class BlocklyXmlBuilder(NodeVisitor):
    def __init__(self, tree_root):
        self.tree_root = tree_root
        self.stack = []
        self.xml = etree.Element('xml')

    def visit(self, node, parent_xml):
        content_object = node.content_object
        for cls in inspect.getmro(content_object.__class__):
            if cls == Model:
                break
            method_name = 'visit_{}'.format(camel_case_to_snake_case(cls.__name__))
            if hasattr(self, method_name):
                getattr(self, method_name)(node, parent_xml)
                break


    def visit_constant(self, node, parent_xml):
        block_type = {
            IntegerConstant: 'math_number',
            StringConstant: 'text',
        }
        field_name = {
            IntegerConstant: 'NUM',
            StringConstant: 'TEXT',
        }
        content_object = node.content_object
        cls = content_object.__class__
        block = etree.Element('block')
        block.set('type', block_type[cls])
        field = etree.Element('field')
        block.append(field)
        field.set('name', field_name[cls])
        field.text = str(node.content_object)
        parent_xml.append(block)


    def build(self):
        self.preorder(self.tree_root, parent_xml=self.xml)
        return etree.tostring(self.xml, pretty_print=True)



def tree_to_blockly_xml(tree_root):
    builder = BlocklyXmlBuilder(tree_root)
    return builder.build()
    return '''<xml xmlns="http://www.w3.org/1999/xhtml">
        <block></block>
        </xml>'''#.format(builder.build())


def blockly_xml_to_tree(xml):
    pass
