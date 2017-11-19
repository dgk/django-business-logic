# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import inspect
import logging
import re

from lxml import etree

from django.db.models import Model

from ..models import *

from .data import OPERATOR_TABLE
from .exceptions import BlocklyXmlBuilderException

logger = logging.getLogger(__name__)


def camel_case_to_snake_case(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


class BlocklyXmlBuilder(NodeCacheHolder):

    def build(self, tree_root):
        xml = etree.Element('xml')
        self.visit(tree_root, parent_xml=xml)
        return etree.tostring(xml, pretty_print=True).decode('utf-8')

    def visit(self, node, parent_xml):
        content_object = node.content_object

        if content_object is None:
            last_xml = None
            for child in self.get_children(node):
                if last_xml is not None:
                    next_element = etree.Element('next')
                    last_xml.append(next_element)
                    parent_xml = next_element
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

            node_xml.set('id', str(node.id))
            return node_xml

        if content_object.__class__ not in (VariableDefinition,):
            logger.debug('Unsupported content_object: {}'.format(content_object.__class__))

    def visit_constant(self, node, parent_xml):
        block_type = {
            NumberConstant: 'math_number',
            StringConstant: 'text',
            BooleanConstant: 'logic_boolean',
            DateConstant: 'business_logic_date',
        }
        field_name = {
            NumberConstant: 'NUM',
            StringConstant: 'TEXT',
            BooleanConstant: 'BOOL',
            DateConstant: 'DATE',
        }
        content_object = node.content_object
        cls = content_object.__class__
        block = etree.SubElement(parent_xml, 'block', type=block_type[cls])
        field_element = etree.SubElement(block, 'field', name=field_name[cls])
        if isinstance(content_object, BooleanConstant):
            field_element.text = str(content_object).upper()
        else:
            field_element.text = str(content_object)
        return block

    def visit_reference_constant(self, node, parent_xml):
        children = self.get_children(node)

        if len(children) != 1:
            raise BlocklyXmlBuilderException('Incorrect number of ReferenceConstant node children: {}'.format(
                len(children)))

        value_object_node = children[0]
        content_type = value_object_node.content_type

        block = etree.SubElement(parent_xml, 'block', type='business_logic_reference')

        type_field = etree.SubElement(block, 'field', name='TYPE')
        type_field.text = '{}.{}'.format(content_type.app_label, content_type.model_class().__name__)

        value_field = etree.SubElement(block, 'field', name='VALUE')
        value_field.text = str(value_object_node.object_id)
        return block

    visit_reference_constant.process_children = True

    def _get_variable_block_type(self, node, action):
        assert action in ('get', 'set')

        if node.content_object.definition.name.find('.') != -1:
            return 'business_logic_argument_field_{}'.format(action)
        return 'variables_{}'.format(action)

    def visit_variable(self, node, parent_xml):
        block_type = self._get_variable_block_type(node, 'get')
        block = etree.SubElement(parent_xml, 'block', type=block_type)
        self._visit_variable(node, block)
        return block

    def visit_assignment(self, node, parent_xml):
        lhs_node, rhs_node = self.get_children(node)
        block_type = self._get_variable_block_type(lhs_node, 'set')
        block = etree.SubElement(parent_xml, 'block', type=block_type)
        self._visit_variable(lhs_node, block)
        value = etree.SubElement(block, 'value', name='VALUE')
        self.visit(rhs_node, value)
        return block

    visit_assignment.process_children = True

    def _visit_variable(self, node, parent_xml):
        variable = node.content_object
        field_element = etree.SubElement(parent_xml, 'field', name='VAR')
        field_element.text = variable.definition.name

    def visit_binary_operator(self, node, parent_xml):

        # determine block_type
        operator_value = node.content_object.operator
        block_type = None
        table = None

        for block_type, table in OPERATOR_TABLE.items():
            if operator_value in table:
                break
        else:
            raise BlocklyXmlBuilderException('Invalid Operator: {}'.format(operator_value))

        block = etree.SubElement(parent_xml, 'block', type=block_type)
        field_element = etree.SubElement(block, 'field', name='OP')
        field_element.text = table[operator_value]

        lhs_node, rhs_node = self.get_children(node)
        for value_name, child_node in (('A', lhs_node), ('B', rhs_node)):
            value = etree.SubElement(block, 'value', name=value_name)
            self.visit(child_node, value)

        return block

    visit_binary_operator.process_children = True

    def visit_if_statement(self, node, parent_xml):
        children = self.get_children(node)
        block = etree.SubElement(parent_xml, 'block', type='controls_if')

        if len(children) > 2:
            mutation = etree.SubElement(block, 'mutation')
            if len(children) % 2:
                mutation.set('else', '1')
            elifs = (len(children) - 2 - len(children) % 2) / 2
            if elifs:
                mutation.set('elseif', str(int(elifs)))

        for i, pair in enumerate(pairs(children)):
            # last "else" branch
            if len(pair) == 1:
                statement = etree.SubElement(block, 'statement', name='ELSE')
                self.visit(pair[0], statement)
                break

            if_condition = pair[0]
            if_value = etree.SubElement(block, 'value', name='IF{}'.format(i))
            self.visit(if_condition, if_value)

            statement = etree.SubElement(block, 'statement', name='DO{}'.format(i))
            self.visit(pair[1], statement)

        return block

    visit_if_statement.process_children = True

    def visit_function(self, node, parent_xml):
        function = node.content_object
        function_definition = function.definition
        children = self.get_children(node)

        block = etree.SubElement(parent_xml, 'block', type='business_logic_function')
        etree.SubElement(block, 'mutation', args='true')
        field_element = etree.SubElement(block, 'field', name='FUNC')
        field_element.text = function_definition.title

        for i, child_node in enumerate(children):
            value = etree.SubElement(block, 'value', name='ARG{}'.format(i))
            self.visit(child_node, value)

        return block

    visit_function.process_children = True
