# -*- coding: utf-8 -*-

from .common import *


class ReferenceDescriptorTest(TestCase):

    def setUp(self):
        self.content_type = ContentType.objects.get_for_model(Model)

    def test_reference_descriptor_search_fields_empty(self):
        reference_descriptor = ReferenceDescriptor.objects.create(content_type=self.content_type)
        self.assertEqual([], reference_descriptor.get_search_fields())

    def test_reference_descriptor_search_fields_split(self):
        reference_descriptor = ReferenceDescriptor.objects.create(
            content_type=self.content_type, search_fields='xxx,    yyy zzz; aa_bb__cc')
        self.assertEqual(['xxx', 'yyy', 'zzz', 'aa_bb__cc'], reference_descriptor.get_search_fields())


# see also tests.test_program.ProgramTest.test_program_version_execute_set_reference_variable


class ReferenceConstantTest(TestCase):

    def test_interpret(self):
        constant = ReferenceConstant.objects.create()
        root = Node.add_root(content_object=constant)
        test_model = Model.objects.create()
        root.add_child(content_object=test_model)
        context = Context()
        self.assertEqual(test_model, constant.interpret(context))

    def test_operator_eq_equals(self):
        root = Node.add_root(content_object=BinaryOperator(operator='=='))

        constant1 = ReferenceConstant.objects.create()
        test_model1 = Model.objects.create()
        constant1_node = root.add_child(content_object=constant1)
        constant1_node.add_child(content_object=test_model1)

        root = Node.objects.get(id=root.id)

        constant2 = ReferenceConstant.objects.create()
        test_model2 = Model.objects.create()
        constant2_node = root.add_child(content_object=constant2)
        constant2_node.add_child(content_object=test_model1)

        root = Node.objects.get(id=root.id)

        context = Context(log=True)
        self.assertTrue(root.interpret(context))

    def test_operator_eq_not_equals(self):
        root = Node.add_root(content_object=BinaryOperator(operator='=='))

        constant1 = ReferenceConstant.objects.create()
        test_model1 = Model.objects.create()
        constant1_node = root.add_child(content_object=constant1)
        constant1_node.add_child(content_object=test_model1)

        root = Node.objects.get(id=root.id)

        constant2 = ReferenceConstant.objects.create()
        test_model2 = Model.objects.create()
        constant2_node = root.add_child(content_object=constant2)
        constant2_node.add_child(content_object=test_model2)

        root = Node.objects.get(id=root.id)

        context = Context(log=True)
        self.assertFalse(root.interpret(context))
