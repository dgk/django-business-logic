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

    def preorder(self, node, *args, **kwargs):
        if not self.visit(node, *args, **kwargs):
            for child in self.get_children(node):
                self.preorder(child, *args, **kwargs)

    def build(self):
        xml = etree.Element('xml')
        self.preorder(self.tree_root, parent_xml=xml)
        return etree.tostring(xml, pretty_print=True)

    def visit(self, node, parent_xml):
        content_object = node.content_object
        for cls in inspect.getmro(content_object.__class__):
            if cls == Model:
                break
            method_name = 'visit_{}'.format(camel_case_to_snake_case(cls.__name__))
            if hasattr(self, method_name):
                return getattr(self, method_name)(node, parent_xml)

    def build_block(self, parent_xml, type):
        block = etree.Element('block')
        block.set('type', type)
        parent_xml.append(block)
        return block


    def build_field(self, parent_xml, name):
        field = etree.Element('field')
        parent_xml.append(field)
        field.set('name', name)
        return field

    def visit_constant(self, node, parent_xml):
        block_type = {
            IntegerConstant: 'math_number',
            FloatConstant: 'math_number',
            StringConstant: 'text',
        }
        field_name = {
            IntegerConstant: 'NUM',
            FloatConstant: 'NUM',
            StringConstant: 'TEXT',
        }
        content_object = node.content_object
        cls = content_object.__class__
        block = self.build_block(parent_xml, block_type[cls])
        field = self.build_field(block, field_name[cls])
        field.text = str(node.content_object)

    def visit_assignment(self, node, parent_xml):
        lhs_node, rhs_node = self.get_children(node)
        #print lhs_node, rhs_node
        assert isinstance(lhs_node.content_object, Variable)
        return True
        #ctx.set_variable(lhs_node.content_object.definition_id, rhs)


def tree_to_blockly_xml(tree_root):
    builder = BlocklyXmlBuilder(tree_root)
    return builder.build()
    return '''<xml xmlns="http://www.w3.org/1999/xhtml">
        <block></block>
        </xml>'''#.format(builder.build())


def blockly_xml_to_tree(xml):
    pass
