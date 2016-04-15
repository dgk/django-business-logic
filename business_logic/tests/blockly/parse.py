# -*- coding: utf-8 -*-

from django.utils.six import StringIO

from lxml import etree

from business_logic.tests.common import *
from pprint import pprint

class BlocklyXmlParserTestCase(TestCase):
    def build_xml(self, node):
        xml_str = BlocklyXmlBuilder().build(node)
        xml_str = xml_str.replace('<xml>', '<xml xmlns="http://www.w3.org/1999/xhtml">')
        return xml_str

class BlocklyXmlParserConstantTest(BlocklyXmlParserTestCase):

    def _test_constant(self, cls, value):
        root = Node.add_root()
        node = root.add_child(content_object=cls(value=value))
        xml_str = self.build_xml(node)
        parsed = BlocklyXmlParser().parse(xml_str)
        self.assertIsInstance(parsed, list)
        self.assertEqual(1, len(parsed))

        constant = parsed[0]
        self.assertIsInstance(constant, dict)
        constant_data = constant['data']
        self.assertEqual(BlocklyXmlParser.get_content_type_id(cls), constant_data['content_type'])
        self.assertEqual(value, constant_data['value'])

    def test_string_constant(self):
        self._test_constant(StringConstant, 'hello')

    def test_float_constant(self):
        self._test_constant(FloatConstant, 1.2223)

    def test_boolean_constant(self):
        for value in (True, False):
            self._test_constant(BooleanConstant, value)

class BlocklyXmlParserAssignmentTest(BlocklyXmlParserTestCase):

    def test_assignment(self):
        entry_point = variable_assign_value()
        node = entry_point.get_children()[1]

        xml_str = self.build_xml(node)
        parsed = BlocklyXmlParser().parse(xml_str)

        self.assertIsInstance(parsed, list)
        self.assertEqual(1, len(parsed))
        root = parsed[0]

        assignment = root['data']
        self.assertIsInstance(assignment, dict)
        self.assertEqual(BlocklyXmlParser.get_content_type_id(Assignment), assignment['content_type'])

        children = root['children']
        self.assertIsInstance(children, list)
        self.assertEqual(2, len(children))

        variable, constant = children

        self.assertIsInstance(variable, dict)
        variable_data = variable['data']
        self.assertEqual(BlocklyXmlParser.get_content_type_id(Variable), variable_data['content_type'])
        self.assertEqual('A', variable_data['name'])

        self.assertIsInstance(constant, dict)
        constant_data = constant['data']
        self.assertEqual(BlocklyXmlParser.get_content_type_id(FloatConstant), constant_data['content_type'])
        self.assertEqual(1, constant_data['value'])


class BlocklyXmlParserBinaryOperatorTest(BlocklyXmlParserTestCase):
    def _test_math_binary_operator(self, operator_value):
        root = Node.add_root(content_object=BinaryOperator(operator=operator_value))

        for i in (1, 2):
            root.add_child(content_object=IntegerConstant(value=i))
            root = Node.objects.get(id=root.id)

        xml_str = self.build_xml(root)
        parsed = BlocklyXmlParser().parse(xml_str)

        self.assertIsInstance(parsed, list)
        self.assertEqual(1, len(parsed))
        root = parsed[0]

        self._test_operator_node(root['data'], operator_value)

        children = root['children']
        self.assertIsInstance(children, list)
        self.assertEqual(2, len(children))

        for i, operand in enumerate(children, 1):
            self.assertIsInstance(operand, dict)
            operand_data = operand['data']
            self.assertEqual(BlocklyXmlParser.get_content_type_id(FloatConstant), operand_data['content_type'])
            self.assertEqual(i, operand_data['value'])

    def _test_logic_binary_operator(self, operator_value):
        root = Node.add_root(content_object=BinaryOperator(operator=operator_value))

        for i in (True, False):
            root.add_child(content_object=BooleanConstant(value=i))
            root = Node.objects.get(id=root.id)

        xml_str = self.build_xml(root)
        parsed = BlocklyXmlParser().parse(xml_str)

        self.assertIsInstance(parsed, list)
        self.assertEqual(1, len(parsed))
        root = parsed[0]

        self._test_operator_node(root['data'], operator_value)

        children = root['children']
        self.assertIsInstance(children, list)
        self.assertEqual(2, len(children))

        for i, operand in enumerate(children):
            expected_value = not bool(i)
            self.assertIsInstance(operand, dict)
            operand_data = operand['data']
            self.assertEqual(BlocklyXmlParser.get_content_type_id(BooleanConstant), operand_data['content_type'])
            self.assertEqual(expected_value, operand_data['value'])

    def _test_operator_node(self, operator, operator_value):
        self.assertIsInstance(operator, dict)
        self.assertEqual(BlocklyXmlParser.get_content_type_id(BinaryOperator), operator['content_type'])
        self.assertEqual(operator_value, operator['operator'])

    def test_operator_add(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#mzvwas
        self._test_math_binary_operator('+')


    def test_operator_minus(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#ec7z5c
        self._test_math_binary_operator('-')


    def test_operator_mul(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#nzq3w5
        self._test_math_binary_operator('*')


    def test_operator_div(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#qzqt69
        self._test_math_binary_operator('/')


    def test_operator_pow(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#skakny
        self._test_math_binary_operator('^')

    def test_operator_eq(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#rzsfmb
        self._test_math_binary_operator('==')


    def test_operator_ne(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#xj34cw
        self._test_math_binary_operator('!=')


    def test_operator_lt(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#oap9ne
        self._test_math_binary_operator('<')


    def test_operator_lte(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#qkk5jx
        self._test_math_binary_operator('<=')


    def test_operator_gt(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#qxdp8u
        self._test_math_binary_operator('>')


    def test_operator_gte(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#kggfq9
        self._test_math_binary_operator('>=')


    def test_operator_and(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#n2uf8x
        self._test_logic_binary_operator('&')


    def test_operator_or(self):
        # https://blockly-demo.appspot.com/static/demos/code/index.html#baz5xq
        self._test_logic_binary_operator('|')


class BlocklyXmlParserBlockTest(BlocklyXmlParserTestCase):
    def test(self):
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
            assignment_node.add_child(content_object=IntegerConstant(value=i))
            root = Node.objects.get(id=root.id)

        xml_str = self.build_xml(root)
        parsed = BlocklyXmlParser().parse(xml_str)

        self.assertIsInstance(parsed, list)
        self.assertEqual(1, len(parsed))
        root = parsed[0]

        pprint(root)
        self.assertFalse(root['data'])
