# -*- coding: utf-8 -*-
import re
import inspect

from lxml import etree

from django.db.models import Model

from .models import *

def camel_case_to_snake_case(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


class BlocklyXmlBuilder(NodeCacheHolder):
    def build(self, tree_root):
        xml = etree.Element('xml')
        self.visit(tree_root, parent_xml=xml)
        return etree.tostring(xml, pretty_print=True)

    def visit(self, node, parent_xml):
        content_object = node.content_object

        if content_object is None:
            last_xml = None
            for child in self.get_children(node):
                if last_xml is not None:
                    next = etree.Element('next')
                    last_xml.append(next)
                    parent_xml = next
                last_xml = self.visit(child, parent_xml)
            return

        for cls in inspect.getmro(content_object.__class__):
            if cls == Model:
                break

            method_name = 'visit_{}'.format(camel_case_to_snake_case(cls.__name__))
            method = getattr(self, method_name, None)

            if not method:
                continue

            node_xml = method(node, parent_xml)

            if not getattr(method, 'process_children', None):
                for child in self.get_children(node):
                    self.visit(child, parent_xml)

            return node_xml

    def build_block(self, parent_xml, type):
        element = etree.Element('block')
        element.set('type', type)
        parent_xml.append(element)
        return element


    def build_field(self, parent_xml, name):
        element = etree.Element('field')
        parent_xml.append(element)
        element.set('name', name)
        return element

    def build_value(self, parent_xml, name):
        element = etree.Element('value')
        parent_xml.append(element)
        element.set('name', name)
        return element

    def visit_constant(self, node, parent_xml):
        block_type = {
            IntegerConstant: 'math_number',
            FloatConstant: 'math_number',
            StringConstant: 'text',
            BooleanConstant: 'logic_boolean',
        }
        field_name = {
            IntegerConstant: 'NUM',
            FloatConstant: 'NUM',
            StringConstant: 'TEXT',
            BooleanConstant: 'BOOL',
        }
        content_object = node.content_object
        cls = content_object.__class__
        block = self.build_block(parent_xml, block_type[cls])
        field = self.build_field(block, field_name[cls])
        if isinstance(content_object, BooleanConstant):
            field.text = str(content_object).upper()
        else:
            field.text = str(content_object)
        return block

    def visit_assignment(self, node, parent_xml):
        lhs_node, rhs_node = self.get_children(node)
        variable = lhs_node.content_object
        assert isinstance(variable, Variable)
        block = self.build_block(parent_xml, 'variables_set')
        field = self.build_field(block, 'VAR')
        field.text = variable.definition.name
        value = self.build_value(block, 'VALUE')
        self.visit(rhs_node, value)
        return block

    visit_assignment.process_children = True

    def visit_binary_operator(self, node, parent_xml):
        operator_table = {
            'math_arithmetic': {
                '+': 'ADD',
                '-': 'MINUS',
                '*': 'MULTIPLY',
                '/': 'DIVIDE',
                '^': 'POWER',
            },
            'logic_compare': {
                '==': 'EQ',
                '!=': 'NEQ',
                '<': 'LT',
                '<=': 'LTE',
                '>': 'GT',
                '>=': 'GTE',
            },

        }


        # determine block_type
        operator = node.content_object.operator
        block_type = None
        table = None

        for block_type, table in operator_table.items():
            if operator in table:
                break

        block = self.build_block(parent_xml, block_type)

        field = self.build_field(block, 'OP')
        field.text = table[operator]

        lhs_node, rhs_node = self.get_children(node)
        for value_name, child_node in (('A', lhs_node), ('B', rhs_node)):
            value = self.build_value(block, value_name)
            self.visit(child_node, value)

        return block

    visit_binary_operator.process_children = True


def tree_to_blockly_xml(tree_root):
    return BlocklyXmlBuilder().build(tree_root)
    return '''<xml xmlns="http://www.w3.org/1999/xhtml">
        <block></block>
        </xml>'''#.format(builder.build())


def blockly_xml_to_tree(xml):
    pass
