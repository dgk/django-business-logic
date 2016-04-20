# -*- coding: utf-8 -*-

from django.utils.six import StringIO

from lxml import etree

from business_logic.tests.common import *


class NodeTreeCreatorTestCase(TestCase):
    def build_xml(self, node):
        xml_str = BlocklyXmlBuilder().build(node)
        xml_str = xml_str.replace('<xml>', '<xml xmlns="http://www.w3.org/1999/xhtml">')
        return xml_str

    def build_dict(self, node):
        xml_str = self.build_xml(node)
        return BlocklyXmlParser().parse(xml_str)[0]

    def tree_diff(self, tree1, tree2):
        return BlocklyXmlBuilder().build(tree1) != BlocklyXmlBuilder().build(tree2)

    def test_test_case_diff(self):
        tree1 = variable_assign_value()
        tree2 = variable_assign_value()
        tree3 = variable_assign_value(variable_name='B')

        self.assertFalse(self.tree_diff(tree1, tree1))
        self.assertFalse(self.tree_diff(tree1, tree2))
        self.assertTrue(self.tree_diff(tree1, tree3))

    def test_create_content_object(self):
        tree1 = variable_assign_value()
        dict1 = self.build_dict(tree1)
        assignmet_data = dict1['data']
        assignmet_data = NodeTreeCreator().create_content_object(assignmet_data)
        self.assertIn('object_id', assignmet_data)
        Assignment.objects.get(id=assignmet_data['object_id'])

    def test_create_variable_definition(self):
        tree1 = variable_assign_value()
        dict1 = self.build_dict(tree1)
        self.assertEqual(1, VariableDefinition.objects.count())

        variable, = NodeTreeCreator().collect_objects(dict1, get_content_type_id(Variable))
        variable_definitions = NodeTreeCreator().create_variable_definitions(dict1)
        self.assertIsInstance(variable_definitions, list)
        self.assertEqual(2, VariableDefinition.objects.count())
        self.assertEqual(1, len(variable_definitions))
        variable_definition, = variable_definitions
        self.assertEqual(variable['data']['variable_definition'],
                         variable_definition['data']['content_object'])

    def test_collect_objects(self):
        tree1 = variable_assign_value()
        dict1 = self.build_dict(tree1)

        objects = NodeTreeCreator().collect_objects(dict1, get_content_type_id(Assignment))
        self.assertIsInstance(objects, list)
        self.assertEqual([dict1, ], objects)

        objects = NodeTreeCreator().collect_objects(dict1, get_content_type_id(Variable))
        self.assertIsInstance(objects, list)
        self.assertEqual([dict1['children'][0], ], objects)

    def test_create_assignment(self):
        tree1 = variable_assign_value()
        #print self.build_dict(tree1)

        tree2 = NodeTreeCreator(tree1).create()

        self.assertIsInstance(tree2, Node)
        self.assertIsNot(tree1, tree2)
        self.assertFalse(self.tree_diff(tree1, tree2))
