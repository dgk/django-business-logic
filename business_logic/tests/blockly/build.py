# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.utils.six import StringIO

from lxml import etree

from business_logic.tests.common import *

#NAMESPACES = {'xmlns': 'http://www.w3.org/1999/xhtml'}

# https://blockly-demo.appspot.com/static/demos/code/index.html


class BlocklyXmlBuilderConstantTest(TestCase):
    def _constant_test(self, statement, block_type, field_name, value=None):
        root = Node.add_root()
        node = root.add_child(content_object=statement)
        xml_str = BlocklyXmlBuilder().build(node)
        xml = etree.parse(StringIO(xml_str))
        block = xml.xpath('/xml/block')
        self.assertEqual(1, len(block))
        block = block[0]
        self.assertEqual(block_type, block.get('type'))
        field = block.find('field')
        self.assertIsNotNone(field)
        self.assertEqual(field_name, field.get('name'))
        if value is not None:
            self.assertEqual(value, field.text)
        else:
            self.assertEqual(str(statement.value), field.text)

    def test_number_constantant(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#zv7x7e
        self._constant_test(NumberConstant(value=1.11456), 'math_number', 'NUM')

    def test_string_constant(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#94euw4
        self._constant_test(StringConstant(value='hello'), 'text', 'TEXT')

    def test_boolean_constant_true(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#fdboqf
        self._constant_test(BooleanConstant(value=True), 'logic_boolean', 'BOOL', 'TRUE')

    def test_boolean_constant_false(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#fksno2
        self._constant_test(BooleanConstant(value=False), 'logic_boolean', 'BOOL', 'FALSE')


class BlocklyXmlBuilderAssignmentTest(TestCase):
    def test_assignment(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#b7driq
        entry_point = variable_assign_value()
        assign_node = entry_point.get_children()[1]

        xml_str = BlocklyXmlBuilder().build(assign_node)
        xml = etree.parse(StringIO(xml_str))

        block = xml.xpath('/xml/block')
        self.assertEqual(1, len(block))
        block = block[0]
        self.assertEqual('variables_set', block.get('type'))

        field, value = block.getchildren()

        self.assertEqual('field', field.tag)
        self.assertEqual('VAR', field.get('name'))
        self.assertEqual('A', field.text)

        self.assertEqual('value', value.tag)
        self.assertEqual('VALUE', value.get('name'))

        block_value, = value.getchildren()
        self.assertEqual('block', block_value.tag)
        self.assertEqual('math_number', block_value.get('type'))


class BlocklyXmlBuilderBlockTest(TestCase):
    def test_block(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#h333qt
        root = Node.add_root()
        vars = ('A', 'B', 'C', 'D')
        var_defs = {}

        for var in vars:
            var_def = VariableDefinition(name=var)
            var_defs[var] = var_def
            root.add_child(content_object=var_def)
            root = Node.objects.get(id=root.id)

        for i, var in enumerate(vars, 1):
            assignment_node = root.add_child(content_object=Assignment())
            assignment_node.add_child(content_object=Variable(definition=var_defs[var]))
            assignment_node.add_child(content_object=NumberConstant(value=i))
            root = Node.objects.get(id=root.id)

        xml_str = BlocklyXmlBuilder().build(root)
        xml = etree.parse(StringIO(xml_str))

        for i, var in enumerate(vars):
            var_value = i + 1.0
            variables_set_block_xpath = '/xml/block' + '/next/block' * i
            block = xml.xpath(variables_set_block_xpath)
            self.assertEqual(1, len(block))
            block = block[0]
            self.assertEqual('variables_set', block.get('type'))

            field = block.find('field')
            self.assertEqual('VAR', field.get('name'))
            self.assertEqual(var, field.text)

            value = block.find('value')
            self.assertEqual('VALUE', value.get('name'))

            math_number, = value.getchildren()
            self.assertEqual('math_number', math_number.get('type'))

            field, = math_number.getchildren()
            self.assertEqual('NUM', field.get('name'))
            self.assertEqual(str(var_value), field.text)


class BlocklyXmlBuilderBinaryOperatorTest(TestCase):
    def _test_math_binary_operator(self, operator, block_type, operator_field_value):
        root = Node.add_root(content_object=BinaryOperator(operator=operator))

        for i in (1.0, 2.0):
            root.add_child(content_object=NumberConstant(value=i))
            root = Node.objects.get(id=root.id)

        xml_str = BlocklyXmlBuilder().build(root)
        xml = etree.parse(StringIO(xml_str))
        block = xml.xpath('/xml/block')
        self.assertEqual(1, len(block))
        block = block[0]
        self.assertEqual(block_type, block.get('type'))
        field = xml.xpath('/xml/block/field')[0]
        self.assertEqual('OP', field.get('name'))
        self.assertEqual(operator_field_value, field.text)
        for field_value, field_name in enumerate(('A', 'B'), 1):
            value = xml.xpath('/xml/block/value[@name="{}"]'.format(field_name))[0]
            math_number = value.find('block')
            self.assertEqual('math_number', math_number.get('type'))
            field, = math_number.getchildren()
            self.assertEqual('NUM', field.get('name'))
            self.assertEqual(str(float(field_value)), field.text)

    def _test_logic_binary_operator(self, operator, block_type, operator_field_value):
        root = Node.add_root(content_object=BinaryOperator(operator=operator))

        for i in (True, False):
            root.add_child(content_object=BooleanConstant(value=i))
            root = Node.objects.get(id=root.id)

        xml_str = BlocklyXmlBuilder().build(root)
        xml = etree.parse(StringIO(xml_str))
        block = xml.xpath('/xml/block')
        self.assertEqual(1, len(block))
        block = block[0]
        self.assertEqual(block_type, block.get('type'))
        field = xml.xpath('/xml/block/field')[0]
        self.assertEqual('OP', field.get('name'))
        self.assertEqual(operator_field_value, field.text)
        for field_value, field_name in ((True, 'A',), (False, 'B')):
            value = xml.xpath('/xml/block/value[@name="{}"]'.format(field_name))[0]
            math_number = value.find('block')
            self.assertEqual('logic_boolean', math_number.get('type'))
            field, = math_number.getchildren()
            self.assertEqual('BOOL', field.get('name'))
            self.assertEqual(str(field_value).upper(), field.text)

    def test_operator_add(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#mzvwas
        self._test_math_binary_operator('+', 'math_arithmetic', 'ADD')

    def test_operator_minus(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#ec7z5c
        self._test_math_binary_operator('-', 'math_arithmetic', 'MINUS')

    def test_operator_mul(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#nzq3w5
        self._test_math_binary_operator('*', 'math_arithmetic', 'MULTIPLY')

    def test_operator_div(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#qzqt69
        self._test_math_binary_operator('/', 'math_arithmetic', 'DIVIDE')

    def test_operator_pow(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#skakny
        self._test_math_binary_operator('^', 'math_arithmetic', 'POWER')

    def test_operator_eq(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#rzsfmb
        self._test_math_binary_operator('==', 'logic_compare', 'EQ')

    def test_operator_ne(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#xj34cw
        self._test_math_binary_operator('!=', 'logic_compare', 'NEQ')

    def test_operator_lt(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#oap9ne
        self._test_math_binary_operator('<', 'logic_compare', 'LT')

    def test_operator_lte(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#qkk5jx
        self._test_math_binary_operator('<=', 'logic_compare', 'LTE')

    def test_operator_gt(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#qxdp8u
        self._test_math_binary_operator('>', 'logic_compare', 'GT')

    def test_operator_gte(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#kggfq9
        self._test_math_binary_operator('>=', 'logic_compare', 'GTE')

    def test_operator_and(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#n2uf8x
        self._test_logic_binary_operator('&', 'logic_operation', 'AND')

    def test_operator_or(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#baz5xq
        self._test_logic_binary_operator('|', 'logic_operation', 'OR')


class BlocklyXmlBuilderIfStatementTest(TestCase):
    def _test_statement(self, xml, statement_name, variable_name):
        self.assertEqual('statement', xml.tag)
        self.assertEqual(statement_name, xml.get('name'))

        variables_set_block, = xml.getchildren()
        self.assertEqual('variables_set', variables_set_block.get('type'))

        field, value = variables_set_block.getchildren()

        self.assertEqual('field', field.tag)
        self.assertEqual('VAR', field.get('name'))
        self.assertEqual(variable_name, field.text)

        self.assertEqual('value', value.tag)
        self.assertEqual('VALUE', value.get('name'))

        block_value, = value.getchildren()
        self.assertEqual('block', block_value.tag)
        self.assertEqual('logic_boolean', block_value.get('type'))

        field, = block_value.getchildren()

        self.assertEqual('field', field.tag)
        self.assertEqual('BOOL', field.get('name'))
        self.assertEqual('TRUE', field.text)

    def _test_condition(self, xml, condition_name, variable_name, use_binary_operator=False):
        self.assertEqual('value', xml.tag)
        self.assertEqual(condition_name, xml.get('name'))

        if_value_block, = xml.getchildren()
        self.assertEqual('block', if_value_block.tag)
        if use_binary_operator:
            self.assertEqual('logic_operation', if_value_block.get('type'))

        else:
            self.assertEqual('variables_get', if_value_block.get('type'))

            if_condition_var_field, = if_value_block.getchildren()
            self.assertEqual('field', if_condition_var_field.tag)
            self.assertEqual('VAR', if_condition_var_field.get('name'))
            self.assertEqual(variable_name, if_condition_var_field.text)

    def _test_block(self, xml):
        self.assertEqual('block', xml.tag)
        self.assertEqual('controls_if', xml.get('type'))

    def test_if(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#k5ygcz
        node, _ = create_if_statement(2)
        xml_str = BlocklyXmlBuilder().build(node)
        xml = etree.parse(StringIO(xml_str))

        block, = xml.getroot().getchildren()
        self._test_block(block)

        children = block.getchildren()
        self.assertEqual(2, len(children))

        if_value = children[0]
        self._test_condition(if_value, 'IF0', 'IfCondition')

        if_statement = children[1]
        self._test_statement(if_statement, 'DO0', 'IfEnter')

    def test_if_not_variable_condition(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#hzuarv
        node, _ = create_if_statement(2, use_binary_operator=True)
        xml_str = BlocklyXmlBuilder().build(node)
        xml = etree.parse(StringIO(xml_str))

        block, = xml.getroot().getchildren()
        self._test_block(block)

        children = block.getchildren()
        self.assertEqual(2, len(children))

        if_value = children[0]
        self._test_condition(if_value, 'IF0', 'IfCondition', use_binary_operator=True)

        if_statement = children[1]
        self._test_statement(if_statement, 'DO0', 'IfEnter')

    def test_if_else(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#9yax5x
        node, _ = create_if_statement(3)
        xml_str = BlocklyXmlBuilder().build(node)
        xml = etree.parse(StringIO(xml_str))

        block, = xml.getroot().getchildren()
        self._test_block(block)

        children = block.getchildren()
        self.assertEqual(4, len(children))

        mutation = children[0]
        self.assertEqual('mutation', mutation.tag)
        self.assertEqual('1', mutation.get('else'))
        self.assertEqual(None, mutation.get('elseif'))

        self._test_condition(children[1], 'IF0', 'IfCondition')

        self._test_statement(children[2], 'DO0', 'IfEnter')

        self._test_statement(children[3], 'ELSE', 'ElseEnter')

    def test_elif(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#tqx7e5
        node, _ = create_if_statement(4)
        xml_str = BlocklyXmlBuilder().build(node)
        xml = etree.parse(StringIO(xml_str))

        block, = xml.getroot().getchildren()
        self._test_block(block)

        children = block.getchildren()
        self.assertEqual(5, len(children))

        mutation = children[0]
        self.assertEqual('mutation', mutation.tag)
        self.assertEqual(None, mutation.get('else'))
        self.assertEqual('1', mutation.get('elseif'))

        self._test_condition(children[1], 'IF0', 'IfCondition')
        self._test_statement(children[2], 'DO0', 'IfEnter')
        self._test_condition(children[3], 'IF1', 'ElseIfCondition1')
        self._test_statement(children[4], 'DO1', 'ElseIfEnter1')

    def test_elif_else(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#y8nw8p
        node, _ = create_if_statement(5)
        xml_str = BlocklyXmlBuilder().build(node)
        xml = etree.parse(StringIO(xml_str))

        block, = xml.getroot().getchildren()
        self._test_block(block)

        children = block.getchildren()
        self.assertEqual(6, len(children))

        mutation = children[0]
        self.assertEqual('mutation', mutation.tag)
        self.assertEqual('1', mutation.get('else'))
        self.assertEqual('1', mutation.get('elseif'))

        self._test_condition(children[1], 'IF0', 'IfCondition')
        self._test_statement(children[2], 'DO0', 'IfEnter')
        self._test_condition(children[3], 'IF1', 'ElseIfCondition1')
        self._test_statement(children[4], 'DO1', 'ElseIfEnter1')
        self._test_statement(children[5], 'ELSE', 'ElseEnter')

    def test_elif_2(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#7iucn3
        node, _ = create_if_statement(6)
        xml_str = BlocklyXmlBuilder().build(node)
        xml = etree.parse(StringIO(xml_str))

        block, = xml.getroot().getchildren()
        self._test_block(block)

        children = block.getchildren()
        self.assertEqual(7, len(children))

        mutation = children[0]
        self.assertEqual('mutation', mutation.tag)
        self.assertEqual(None, mutation.get('else'))
        self.assertEqual('2', mutation.get('elseif'))

        self._test_condition(children[1], 'IF0', 'IfCondition')
        self._test_statement(children[2], 'DO0', 'IfEnter')
        self._test_condition(children[3], 'IF1', 'ElseIfCondition1')
        self._test_statement(children[4], 'DO1', 'ElseIfEnter1')
        self._test_condition(children[5], 'IF2', 'ElseIfCondition2')
        self._test_statement(children[6], 'DO2', 'ElseIfEnter2')
