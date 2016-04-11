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
        block = etree.SubElement(parent_xml, 'block', type=block_type[cls])
        field = etree.SubElement(block, 'field', name=field_name[cls])
        if isinstance(content_object, BooleanConstant):
            field.text = str(content_object).upper()
        else:
            field.text = str(content_object)
        return block

    def visit_variable(self, node, parent_xml):
        variable = node.content_object
        field = etree.SubElement(parent_xml, 'field', name='VAR')
        field.text = variable.definition.name

    def visit_assignment(self, node, parent_xml):
        lhs_node, rhs_node = self.get_children(node)
        block = etree.SubElement(parent_xml, 'block', type='variables_set')
        self.visit(lhs_node, block)
        value = etree.SubElement(block, 'value', name='VALUE')
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
            'logic_operation': {
                '&': 'AND',
                '|': 'OR',
            },

        }

        # determine block_type
        operator = node.content_object.operator
        block_type = None
        table = None

        for block_type, table in operator_table.items():
            if operator in table:
                break
        else:
            assert False
        block = etree.SubElement(parent_xml, 'block', type=block_type)
        field = etree.SubElement(block, 'field', name='OP')
        field.text = table[operator]

        lhs_node, rhs_node = self.get_children(node)
        for value_name, child_node in (('A', lhs_node), ('B', rhs_node)):
            value = etree.SubElement(block, 'value', name=value_name)
            self.visit(child_node, value)

        return block

    visit_binary_operator.process_children = True

    def visit_if_statement(self, node, parent_xml):
        children = self.get_children(node)
        if_statement = children[0]
        block = etree.SubElement(parent_xml, 'block', type='controls_if')
        if_value = etree.SubElement(block, 'value', name='IF0')
        if isinstance(if_statement.content_object, Variable):
            variables_get_block = etree.SubElement(if_value, 'block', type='variables_get')
            self.visit(if_statement, variables_get_block)

        statement = etree.SubElement(block, 'statement', name='DO0')
        self.visit(children[1], statement)


    visit_if_statement.process_children = True


def tree_to_blockly_xml(tree_root):
    return BlocklyXmlBuilder().build(tree_root)


def blockly_xml_to_tree(xml):
    pass
