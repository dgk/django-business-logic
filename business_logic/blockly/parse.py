# -*- coding: utf-8 -*-
from lxml import etree, objectify

from django.contrib.contenttypes.models import ContentType
from django.utils.six import StringIO

from ..models import *

from .data import REVERSE_OPERATOR_TABLE

class BlocklyXmlParser(object):
    def parse(self, xml_str):
        '''
        :param xml_str: blockly native XML string
        :type xml_str: str
        :return: list of dictionaries similar to treebeard.Node.dump_bulk() return value structure
        :rtype: list
        '''

        xml = etree.parse(StringIO(xml_str))
        root_node = xml.getroot()
        self.cleanup_namespace(root_node)
        return [self.visit(root_node), ]

    @staticmethod
    def cleanup_namespace(root):
        # http://stackoverflow.com/a/18160164
        for elem in root.getiterator():
            if not hasattr(elem.tag, 'find'):
                continue
            i = elem.tag.find('}')
            if i >= 0:
                elem.tag = elem.tag[i + 1:]
        objectify.deannotate(root, cleanup_namespaces=True)

    @staticmethod
    def get_content_type_id(model):
        return ContentType.objects.get_for_model(model).id

    def visit(self, node):
        method_name = 'visit_{}'.format(node.tag)
        method = getattr(self, method_name, None)

        if method:
            return method(node)
        # TODO: remove
        print method_name, ' - method not exists'
        return
        data = {}

        children = node.getchildren()
        if children:
            data['children'] = []
            for child in children:
                data['children'].append(self.visit(child))

        return data

    def _visit_children(self, node, data, children=None):
        data['children'] = []
        for child in node.getchildren() if children is None else children:
            data['children'].append(self.visit(child))

    def _visit_single_child(self, node):
        children = node.getchildren()
        assert len(children) == 1
        return self.visit(children[0])

    def _visit_binary_operator(self, node):
        operator, lft_operand, rgh_operand = node.getchildren()
        data = {
            'data': {
                'content_type': self.get_content_type_id(BinaryOperator),
                'operator': REVERSE_OPERATOR_TABLE[node.get('type')][operator.text]
            }
        }

        self._visit_children(node, data, (lft_operand, rgh_operand))

        return data

    def visit_xml(self, node):
        children = node.getchildren()

        if not children:
            return []

        if len(children) > 1:
            data = {}
            self._visit_children(node, data)
            return data

        return self._visit_single_child(node)

    def visit_block(self, node):
        method_name = 'visit_block_{}'.format(node.get('type'))
        method = getattr(self, method_name)
        return method(node)

    def visit_block_text(self, node):
        return self._visit_single_child(node)

    def visit_block_variables_set(self, node):
        data = {
            'data': {
                'content_type': self.get_content_type_id(Assignment),
            }
        }

        self._visit_children(node, data)

        return data

    def visit_block_logic_compare(self, node):
        return self._visit_binary_operator(node)

    def visit_block_logic_operation(self, node):
        return self._visit_binary_operator(node)

    def visit_block_math_arithmetic(self, node):
        return self._visit_binary_operator(node)

    def visit_block_math_number(self, node):
        return self._visit_single_child(node)

    def visit_block_logic_boolean(self, node):
        return self._visit_single_child(node)

    def visit_field(self, node):
        method_name = 'visit_field_{}'.format(node.get('name').lower())
        method = getattr(self, method_name)
        return method(node)

    def visit_field_var(self, node):
        data = {
            'data': {
                'content_type': self.get_content_type_id(Variable),
                'name': node.text
            }
        }

        return data

    def visit_field_num(self, node):
        return {
            'data': {
                'content_type': self.get_content_type_id(FloatConstant),
                'value': float(node.text)
            }
        }

    def visit_field_text(self, node):
        return {
            'data': {
                'content_type': self.get_content_type_id(StringConstant),
                'value': node.text
            }
        }

    def visit_field_bool(self, node):
        return {
            'data': {
                'content_type': self.get_content_type_id(BooleanConstant),
                'value': node.text.lower() == 'true'
            }
        }

    def visit_value(self, node):
        return self._visit_single_child(node)
