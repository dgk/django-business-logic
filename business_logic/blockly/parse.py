# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import datetime
from lxml import etree, objectify

from django.utils.six import StringIO

from ..models import *
from ..utils import get_content_type_id

from .data import REVERSE_OPERATOR_TABLE
from .exceptions import BlocklyXmlParserException


class BlocklyXmlParser(object):

    def parse(self, xml_str):
        """
        :param xml_str: blockly native XML string
        :type xml_str: str
        :return: list of dictionaries similar to treebeard.Node.dump_bulk() return value structure
        :rtype: list
        """

        xml = etree.parse(StringIO(xml_str))
        root_node = xml.getroot()
        self.cleanup_namespace(root_node)
        self.transform_shadow(root_node)
        return [
            self.visit(root_node),
        ]

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
    def transform_shadow(root):
        for shadow in root.xpath('.//shadow'):
            sibling = shadow.getnext()
            if sibling is not None and sibling.tag == 'block':
                shadow.getparent().remove(shadow)
            else:
                shadow.tag = 'block'

    def visit(self, node):
        parent = node.getparent()

        if parent is not None and parent.tag != 'next' and node.find('next') is not None:
            # start of code block
            data = self._process_next(node)
        else:
            data = self._call_method(node)

        return data

    def _process_next(self, node):
        children = []
        _node = node

        while True:
            next = _node.find('next')
            if next is None:
                break

            _children = next.getchildren()

            if len(_children) != 1:
                raise BlocklyXmlParserException(
                    'Incorrect number of children ({}) for BlocklyXmlParser._process_next()'.format(len(_children)))

            _node = _children[0]
            children.append(_node)

        data = {'children': [self._call_method(node)], 'data': {}}
        if children:
            self._visit_children(None, data, children)

        return data

    def _call_method(self, node):
        if node.tag in ('next', 'mutation'):
            return

        method_name = 'visit_{}'.format(node.tag)
        method = getattr(self, method_name, None)

        if method:
            return method(node)

        raise BlocklyXmlParserException('Unknown tag: {}'.format(node.tag))

    def _visit_children(self, node, data, children=None):
        if 'children' not in data:
            data['children'] = []
        for child in node.getchildren() if children is None else children:
            child_data = self.visit(child)
            if child_data is not None:
                data['children'].append(child_data)

    def _visit_single_child(self, node):
        children = node.getchildren()

        if len(children) != 1:
            raise BlocklyXmlParserException(
                'Incorrect number of children ({}) for BlocklyXmlParser._visit_single_child()'.format(len(children)))

        return self.visit(children[0])

    def _visit_binary_operator(self, node):
        operator, lft_operand, rgh_operand = node.getchildren()
        data = {
            'data': {
                'content_type': get_content_type_id(BinaryOperator),
                'operator': REVERSE_OPERATOR_TABLE[node.get('type')][operator.text]
            }
        }

        self._visit_children(node, data, (lft_operand, rgh_operand))

        return data

    def _visit_field(self, cls, **kwargs):
        data = {
            'data': {
                'content_type': get_content_type_id(cls),
            }
        }
        data['data'].update(kwargs)
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
                'content_type': get_content_type_id(Assignment),
            }
        }

        self._visit_children(node, data)

        return data

    def visit_block_variables_get(self, node):
        return self._visit_single_child(node)

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

    def visit_block_controls_if(self, node):
        data = {
            'data': {
                'content_type': get_content_type_id(IfStatement),
            }
        }

        self._visit_children(node, data)

        return data

    def visit_field(self, node):
        method_name = 'visit_field_{}'.format(node.get('name').lower())
        method = getattr(self, method_name)
        return method(node)

    def visit_field_var(self, node):
        return self._visit_field(Variable, name=node.text)

    def visit_field_num(self, node):
        return self._visit_field(NumberConstant, value=float(node.text))

    def visit_field_text(self, node):
        return self._visit_field(StringConstant, value=node.text)

    def visit_field_bool(self, node):
        return self._visit_field(BooleanConstant, value=node.text.lower() == 'true')

    def visit_field_date(self, node):
        return self._visit_field(DateConstant, value=datetime.datetime.strptime(node.text, '%Y-%m-%d').date())

    def visit_value(self, node):
        return self._visit_single_child(node)

    def visit_statement(self, node):
        return self._visit_single_child(node)

    def visit_block_business_logic_date(self, node):
        return self._visit_single_child(node)

    def visit_block_business_logic_reference(self, node):
        data = {
            'data': {
                'content_type': get_content_type_id(ReferenceConstant),
            }
        }
        children = node.getchildren()
        app_label, model = children[0].text.split('.')

        data['children'] = [{
            'data': {
                'content_type': ContentType.objects.get(app_label=app_label, model=model.lower()).id,
                'object_id': children[1].text
            }
        }]
        return data

    def visit_block_business_logic_argument_field_set(self, node):
        return self.visit_block_variables_set(node)

    def visit_block_business_logic_argument_field_get(self, node):
        return self.visit_block_variables_get(node)

    def visit_block_business_logic_function(self, node):
        children = node.getchildren()

        data = {
            'data': {
                'content_type': get_content_type_id(Function),
                'definition_id': FunctionDefinition.objects.get(title=children[1].text).id
            }
        }

        self._visit_children(node, data, children=children[2:])

        return data
