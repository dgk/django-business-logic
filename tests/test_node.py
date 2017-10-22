# -*- coding: utf-8 -*-
#

from __future__ import print_function
from datetime import datetime

from django.conf import settings
from django.db import connection

from .common import *


class NodeTest(TestCase):
    def test_add_root(self):
        operator = BinaryOperator(operator='+')
        operator.save()
        root = Node.add_root(content_object=operator)
        self.failUnless(root.id)
        self.failUnless(root.content_object)
        self.failUnlessEqual(operator.operator, root.content_object.operator)
        self.failUnlessEqual('+', root.content_object.operator)
        root = Node.objects.get(id=root.id)
        self.failUnless(root.content_object)
        self.failUnlessEqual(operator.operator, root.content_object.operator)
        self.failUnlessEqual('+', root.content_object.operator)

    def test_add_child(self):
        operator = BinaryOperator(operator='+')
        operator.save()
        root = Node.add_root(content_object=operator)
        self.failUnless(root.is_leaf())

        self.failUnless(root.content_object)
        self.failUnless(root.object_id)
        self.failUnlessEqual(operator.operator, root.content_object.operator)
        self.failUnlessEqual('+', root.content_object.operator)
        self.failUnlessEqual(0, len(root.get_children()))

        number_constant1 = NumberConstant(value=1)
        child_node = root.add_child(content_object=number_constant1)
        self.failUnless(child_node.id)
        self.failUnless(child_node.content_object)

        self.failUnless(root.is_root())
        self.failUnlessEqual(1, len(root.get_children()))

        root = Node.objects.get(id=root.id)
        self.failUnlessEqual(1, len(root.get_children()))

    def test_tree(self):
        root = Node.add_root()
        self.failUnless(root.is_leaf())
        statement1 = NumberConstant(value=33)
        statement2 = NumberConstant(value=44)
        root = Node.objects.get(id=root.id)
        node1 = root.add_child(content_object=statement1)

        self.failUnless(node1.content_object.id)
        self.failUnless(node1.content_object.value)
        self.failUnless(node1.object_id)

        self.failUnlessEqual(node1.content_object.id, statement1.id)
        self.failUnlessEqual(node1.content_object.value, statement1.value)
        self.failUnlessEqual(node1.object_id, statement1.id)

        self.failUnless(root.pk)
        self.failUnless(statement1.pk)
        self.failUnless(root.is_root())

        root = Node.objects.get(id=root.id)
        node2 = root.add_child(content_object=statement2)
        self.failUnlessEqual(node2.content_object, statement2)

        root = Node.objects.get(id=root.id)
        children = root.get_descendants()
        self.failUnlessEqual(len(children), 2)

        child_objects = [x.content_object for x in children]
        self.failUnlessEqual(node1.content_object.value, child_objects[0].value)
        self.failUnlessEqual(node2.content_object.value, child_objects[1].value)

    def test_traverse(self):
        add_node = tree_1plus2mul3()
        node1, mul_node = add_node.get_children()
        node2, node3 = mul_node.get_children()

        class Visitor(NodeVisitor):
            def __init__(self):
                self.visited = []

            def visit(self, visited):
                self.visited.append(visited)

        # preoder
        visitor = Visitor()
        visitor.preorder(add_node)
        self.failUnlessEqual(visitor.visited, [add_node, node1, mul_node, node2, node3])

        # postorder
        visitor = Visitor()
        visitor.postorder(add_node)
        self.failUnlessEqual(visitor.visited, [node1, node2, node3, mul_node, add_node, ])

    def test_recursive_delete(self):
        root = Node.add_root()
        statement1 = NumberConstant(value=1)
        statement2 = NumberConstant(value=2)
        node1 = root.add_child(content_object=statement1)
        self.failUnlessEqual(1, len(root.get_children()))
        node2 = root.add_child(content_object=statement2)
        root = Node.objects.get(id=root.id)
        self.failUnlessEqual(2, len(root.get_children()))

        self.failUnless(NumberConstant.objects.filter(
            pk=statement1.pk).count())
        self.failUnless(NumberConstant.objects.filter(
            pk=statement2.pk).count())
        self.failUnless(Node.objects.filter(pk=node1.pk).count())
        self.failUnless(Node.objects.filter(pk=node2.pk).count())

        root.delete()

        self.failIf(NumberConstant.objects.filter(pk=statement1.pk).count())
        self.failIf(NumberConstant.objects.filter(pk=statement2.pk).count())
        self.failIf(Node.objects.filter(pk=node1.pk).count())
        self.failIf(Node.objects.filter(pk=node2.pk).count())

    def test_delete_with_lost_content_object(self):
        root = Node.add_root()
        statement1 = NumberConstant(value=1)
        node1 = root.add_child(content_object=statement1)
        statement1.delete()

        root.delete()

    def test_node_deletion_should_not_delete_content_objects_from_other_apps(self):
        root = Node.add_root()
        test_model = Model.objects.create()
        root.add_child(content_object=test_model)
        root = Node.objects.get(id=root.id)

        root.delete()

        self.assertTrue(Model.objects.filter(id=test_model.id))
        self.assertFalse(Node.objects.all())

    def test_statement_or_block(self):
        root = Node.add_root()
        self.failUnless(root.is_block())
        self.failIf(root.is_statement())
        node1 = tree_1plus2mul3(parent=root)
        self.failUnless(root.is_block())
        self.failIf(root.is_statement())
        self.failIf(node1.is_block())
        self.failUnless(node1.is_statement())

    def test_tree_1plus2mul3(self):
        add_node = tree_1plus2mul3()
        self.failUnlessEqual(add_node.content_object.operator, '+')
        int_1node, mul_node = add_node.get_children().all()
        self.failUnlessEqual(int_1node.content_object.value, 1)
        self.failUnlessEqual(mul_node.content_object.operator, '*')
        int_2node, int_3node = mul_node.get_children().all()
        self.failUnlessEqual(int_2node.content_object.value, 2)
        self.failUnlessEqual(int_3node.content_object.value, 3)

    @unittest.skip('TODO: Node.clone() not properly implemented')
    def test_tree_clone(self):
        root = get_test_tree()
        clone = root.clone()
        #root.delete()
        self.failUnless(isinstance(clone, Node))
        context = Context()

        clone.interpret(context)

        variable_definition = VariableDefinition.objects.get(name='A')
        self.assertEqual(1 + 2 * 3, context.get_variable(variable_definition))

    def test_content_object_node_accessor(self):
        root = symmetric_tree()
        content_object = root.content_object
        self.failUnlessEqual(content_object.node, root)


class NodeInterpretTest(TestCase):
    def test_interpret_3(self):
        add_operator = BinaryOperator(operator='+')
        add_operator.save()
        root = Node.add_root(content_object=add_operator)

        number_constant1 = NumberConstant(value=5)
        number_constant_node1 = root.add_child(content_object=number_constant1)

        number_constant2 = NumberConstant(value=6)
        root = Node.objects.get(id=root.id)
        number_constant_node2 = root.add_child(content_object=number_constant2)
        root = Node.objects.get(id=root.id)

        context = Context(cache=False)
        result = root.interpret(context)

        self.failUnlessEqual(number_constant1.value + number_constant2.value, result)

    def test_interpret_tree(self):

        add_operator = BinaryOperator(operator='+')
        add_operator.save()
        mul_operator = BinaryOperator(operator='*')

        root = Node.add_root(content_object=add_operator)

        number_constant1 = NumberConstant(value=2)
        number_constant_node1 = root.add_child(content_object=number_constant1)

        number_constant2 = NumberConstant(value=3)
        number_constant3 = NumberConstant(value=4)

        mul_operator_node = root.add_child(content_object=mul_operator)
        mul_operator_node.add_child(content_object=number_constant2)
        mul_operator_node.add_child(content_object=number_constant3)

        context = Context()
        root = Node.objects.get(id=root.id)
        result = root.interpret(context)

        self.failUnlessEqual(2 + 3 * 4, result)

    def _test_long_time_interpret(self):
        # settings.DEBUG = True
        start_time = datetime.now()

        count = 16
        count = 64
        count = 256
        count = 512
        count = 1024
        count = 1024 * 8
        # count = 256
        # count = 1024 * 1024 # 1048576
        # count = 1024 * 16 # 1048576

        context = Context(cache=True)

        def calculation_time(msg):
            now = datetime.now()
            calculation_time = now - start_time
            print(msg, float(calculation_time.seconds) +
                  float(calculation_time.microseconds) / 1000000)
            return now

        root = symmetric_tree(operator='+', value=1, count=count)
        start_time = calculation_time('compiling')
        compilation_queries_count = len(connection.queries)

        result = root.interpret(context)
        start_time = calculation_time('executing')

        self.failUnlessEqual(count, result)
        start_time = calculation_time('executing2')

        self.failUnlessEqual(count, result)
        for q in connection.queries[compilation_queries_count:]:
            print(q['sql'])
        print('queries.count', len(connection.queries) -
              compilation_queries_count)

    def test_interpret_block_should_return_none(self):
        root = Node.add_root()
        node1 = tree_1plus2mul3(parent=root)
        node2 = symmetric_tree(operator='*', value=5, count=4, parent=root)

        context = Context()
        result = node1.interpret(context)
        self.failUnlessEqual(7, result)

        root = Node.objects.get(id=root.id)
        context = Context()
        result = root.interpret(context)
        self.assertIsNone(result)

    def test_symmetric_tree(self):
        root = symmetric_tree()
        context = Context()
        result = root.interpret(context)
        self.failUnlessEqual(2, result)
        root = symmetric_tree(operator='*', count=4, value=5)
        context = Context()
        result = root.interpret(context)
        self.failUnlessEqual(625, result)


class NodeInterpretExceptionTest(TestCase):
    def create_test_tree(self):
        root = Node.add_root()
        symmetric_tree(operator='/', value=0, count=2, parent=root)
        root = Node.objects.get(id=root.id)
        node1 = root.add_child()
        variable_assign_value(parent=node1)
        root = Node.objects.get(id=root.id)
        return root

    def test_interpret_should_handle_exception(self):
        node = symmetric_tree(operator='/', value=0, count=2)
        context = Context()
        result = node.interpret(context)
        self.assertTrue('no exception raised')

    def test_interpret_should_handle_exception_and_interrupt_interpretation(self):
        root = self.create_test_tree()
        context = Context()
        result = root.interpret(context)
        self.assertIsInstance(context.get_variable(VariableDefinition.objects.get(name='A')), Variable.Undefined)

    def test_interpret_should_handle_exception_and_continue_interpretation(self):
        root = self.create_test_tree()
        context = Context(exception_handling_policy=ExceptionHandlingPolicy.IGNORE)
        result = root.interpret(context)
        self.assertEqual(1, context.get_variable(VariableDefinition.objects.get(name='A')))


class NodeCacheTest(TestCase):
    def setUp(self):
        settings.DEBUG = True

    def tearDown(self):
        settings.DEBUG = False

    def test_simple_tree_cache(self):
        queries = connection.queries
        cache_holder = NodeCacheHolder()
        node = symmetric_tree()
        not_cached_children = node.get_children().all()
        cached_children = cache_holder.get_children(node)
        self.failUnless(isinstance(cache_holder._node_cache, NodeCache))
        for i, child in enumerate(not_cached_children):
            self.failUnlessEqual(child.id, cached_children[i].id)
        max_num_queries = len(queries)
        self.failUnlessEqual(max_num_queries, len(queries))
        content_object = node.content_object
        self.failUnlessEqual(max_num_queries, len(queries))
        content_object = cached_children[0].content_object
        self.failUnlessEqual(max_num_queries, len(queries))
        content_object = cached_children[1].content_object
        self.failUnlessEqual(max_num_queries, len(queries))

    def test_init_node_in_cache(self):
        cache_holder = NodeCacheHolder()
        node = symmetric_tree()
        cached_children = cache_holder.get_children(node)
        self.failUnless(node is cache_holder._node_cache._node_by_id[node.id])

    def test_medium_tree_cache(self):
        queries = connection.queries
        cache_holder = NodeCacheHolder()
        node = symmetric_tree(count=4)
        lft_mul_node, rgh_mul_node = node.get_children().all()
        lft_lft_child, rgh_lft_child = lft_mul_node.get_children().all()
        lft_rgh_child, rgh_rgh_child = rgh_mul_node.get_children().all()
        cached_lft_mul_node, cached_rgh_mul_node = cache_holder.get_children(node)

        max_num_queries = len(queries)
        cached_lft_lft_child, cached_rgh_lft_child = cache_holder.get_children(cached_lft_mul_node)
        cached_lft_rgh_child, cached_rgh_rgh_child = cache_holder.get_children(cached_rgh_mul_node)
        self.failUnlessEqual(max_num_queries, len(queries))
        cached_lft_rgh_child, cached_rgh_rgh_child = cache_holder.get_children(rgh_mul_node)
        content_object = cached_rgh_mul_node.content_object
        content_object = cached_lft_rgh_child.content_object
        content_object = cached_rgh_rgh_child.content_object
        self.failUnlessEqual(max_num_queries, len(queries))

    def test_content_object_node_accessor(self):
        queries = connection.queries
        cache_holder = NodeCacheHolder()
        root = symmetric_tree()
        cache_holder.get_children(root)
        max_num_queries = len(queries)
        content_object = root.content_object
        self.failUnless(content_object.node is root)
        self.failUnlessEqual(max_num_queries, len(queries))
