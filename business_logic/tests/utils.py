# -*- coding: utf-8 -*-

import math
from itertools import izip_longest, imap

from django.contrib.contenttypes.models import ContentType

from ..models import *


def tree_1plus2mul3(parent=None):
    # http://upload.wikimedia.org/wikipedia/ru/d/db/Parsing-example.png

    add_operator = BinaryOperator(operator='+')
    add_operator.save()

    mul_operator = BinaryOperator(operator='*')

    if parent is None:
        add_node = Node.add_root(content_object=add_operator)
    else:
        add_node = Node.objects.get(id=parent.id).add_child(content_object=add_operator)

    integer_const1 = IntegerConstant(value=1)
    integer_const_node1 = add_node.add_child(content_object=integer_const1)
    add_node = Node.objects.get(id=add_node.id)

    integer_const2 = IntegerConstant(value=2)
    integer_const3 = IntegerConstant(value=3)

    mul_node = add_node.add_child(content_object=mul_operator)
    mul_node = Node.objects.get(id=mul_node.id)
    mul_node.add_child(content_object=integer_const2)
    mul_node = Node.objects.get(id=mul_node.id)
    mul_node.add_child(content_object=integer_const3)

    return Node.objects.get(id=add_node.id)


def symmetric_tree(operator='+', value=1, count=2,
        operand_cls=IntegerConstant, parent=None):

    assert math.modf(math.log(count, 2))[0] == 0

    bin_operator = BinaryOperator(operator=operator)
    bin_operator.save()
    operator_content_type_id = ContentType.objects.get_for_model(BinaryOperator).id
    operand_content_type_id = ContentType.objects.get_for_model(operand_cls).id

    if parent is None:
        root = Node.add_root(content_object=bin_operator)
    else:
        root = Node.objects.get(id=parent.id).add_child(content_object=bin_operator)

    top = []
    bottom = []
    levels = int(math.log(count, 2))
    for level in range(1, levels + 1):
        if levels != level:
            content_type_id = operator_content_type_id
            obj_cls = BinaryOperator
            obj_kwargs = dict(operator=operator)
        else:
            content_type_id = operand_content_type_id
            obj_cls = operand_cls
            obj_kwargs = dict(value=value)

        level_objects = [
            dict(data=dict(
                        object_id=obj_cls.objects.create(**obj_kwargs).id,
                        content_type_id=content_type_id
                        ))
            for x in range(pow(2, level)) ]

        if level == 1:
            top = bottom = level_objects
        else:
            pairs = [x for x in izip_longest(*[iter(level_objects)]*2)]
            def f(parent, children):
                parent['children'] = children
            list(imap(f, bottom, pairs))
            bottom = level_objects

    Node.load_bulk(top, root)
    return Node.objects.get(id=root.id)


def get_test_tree():
        root = Node.add_root()

        var_def = VariableDefinition(name='A')
        root.add_child(content_object=var_def)
        root = Node.objects.get(id=root.id)

        assignment_node = root.add_child(content_object=Assignment())
        var = Variable(definition=var_def)
        var_node = assignment_node.add_child(content_object=var)
        tree_1plus2mul3(parent=assignment_node)

        root = Node.objects.get(id=root.id)
        return root

def var_A_assign_1():
        root = Node.add_root()

        var_def = VariableDefinition(name='A')
        root.add_child(content_object=var_def)
        root = Node.objects.get(id=root.id)

        assignment_node = root.add_child(content_object=Assignment())
        var = Variable(definition=var_def)
        var_node = assignment_node.add_child(content_object=var)
        integer_const1 = IntegerConstant(value=1)
        integer_const_node1 = assignment_node.add_child(content_object=integer_const1)

        root = Node.objects.get(id=root.id)
        return root


def print_tree_details(nodes):
    # mptt/tests/doctests.py
    opts = nodes[0]._meta
    print '\n'.join(['%s %s %s %s %s %s' % \
                     (n.pk, getattr(n, '%s_id' % opts.parent_attr) or '-',
                      getattr(n, opts.tree_id_attr), getattr(n, opts.level_attr),
                      getattr(n, opts.left_attr), getattr(n, opts.right_attr)) \
                     for n in nodes])
