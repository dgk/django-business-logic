# -*- coding: utf-8 -*-

from __future__ import print_function

import math

from django.contrib.contenttypes.models import ContentType

from django.utils import six

if six.PY2:
    from itertools import izip_longest as zip_longest
else:
    from itertools import zip_longest


from business_logic.models import *
from business_logic.utils import *


def tree_1plus2mul3(parent=None):
    # http://upload.wikimedia.org/wikipedia/ru/d/db/Parsing-example.png
    # https://blockly-demo.appspot.com/static/demos/code/index.html#b8dsrg

    add_operator = BinaryOperator(operator='+')
    add_operator.save()

    mul_operator = BinaryOperator(operator='*')

    if parent is None:
        add_node = Node.add_root(content_object=add_operator)
    else:
        add_node = Node.objects.get(id=parent.id).add_child(content_object=add_operator)

    number_const1 = NumberConstant(value=1)
    number_const_node1 = add_node.add_child(content_object=number_const1)
    add_node = Node.objects.get(id=add_node.id)

    number_const2 = NumberConstant(value=2)
    number_const3 = NumberConstant(value=3)

    mul_node = add_node.add_child(content_object=mul_operator)
    mul_node = Node.objects.get(id=mul_node.id)
    mul_node.add_child(content_object=number_const2)
    mul_node = Node.objects.get(id=mul_node.id)
    mul_node.add_child(content_object=number_const3)

    return Node.objects.get(id=add_node.id)


def symmetric_tree(operator='+', value=1, count=2,
                   operand_cls=NumberConstant, parent=None):
    assert math.modf(math.log(count, 2))[0] == 0

    bin_operator = BinaryOperator(operator=operator)
    bin_operator.save()
    operator_content_type_id = ContentType.objects.get_for_model(BinaryOperator).id
    operand_content_type_id = ContentType.objects.get_for_model(operand_cls).id

    if parent is None:
        root = Node.add_root(content_object=bin_operator)
    else:
        root = Node.objects.get(id=parent.id).add_child(content_object=bin_operator)

    levels = int(math.log(count, 2))

    top = bottom = None
    for level in range(1, levels + 1):
        if levels == level:
            # last level, create constants
            content_type_id = operand_content_type_id
            obj_cls = operand_cls
            obj_kwargs = dict(value=value)
        else:
            # create operators
            content_type_id = operator_content_type_id
            obj_cls = BinaryOperator
            obj_kwargs = dict(operator=operator)

        level_objects = [
            dict(data=dict(
                object_id=obj_cls.objects.create(**obj_kwargs).id,
                content_type_id=content_type_id
            ))
            for x in range(pow(2, level))]

        if level == 1:
            top = level_objects
        else:
            pairs = zip_longest(*[iter(level_objects)] * 2)

            for parent, children in zip_longest(bottom, pairs):
                parent['children'] = children

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


def variable_assign_value(variable_name='A', variable_definition=None, value=None, parent=None):
    if parent is None:
        parent = Node.add_root()

    if variable_definition is None:
        variable_definition = VariableDefinition(name=variable_name)
        parent.add_child(content_object=variable_definition)
        parent = Node.objects.get(id=parent.id)

    assignment_node = parent.add_child(content_object=Assignment())
    variable = Variable(definition=variable_definition)
    var_node = assignment_node.add_child(content_object=variable)
    number_const_node1 = assignment_node.add_child(content_object=value or NumberConstant(value=1))

    parent = Node.objects.get(id=parent.id)
    return parent


def print_tree_details(nodes):
    # mptt/tests/doctests.py
    opts = nodes[0]._meta
    print('\n'.join(['%s %s %s %s %s %s' %
                     (n.pk, getattr(n, '%s_id' % opts.parent_attr) or '-',
                      getattr(n, opts.tree_id_attr), getattr(n, opts.level_attr),
                      getattr(n, opts.left_attr), getattr(n, opts.right_attr))
                     for n in nodes]))


def create_if_statement(branches_count, use_binary_operator=False, root=None):
    var_defs = {}

    def reload_node(node):
        return Node.objects.get(id=node.id)

    if root is None:
        root = Node.add_root()
    else:
        root = reload_node(root)

    vars = (
        'IfCondition',
        'IfEnter',
        'ElseIfCondition1',
        'ElseIfEnter1',
        'ElseIfCondition2',
        'ElseIfEnter2',
        'ElseEnter',
    )

    for variable_name in vars:
        var_def = VariableDefinition(name=variable_name)
        var_defs[variable_name] = var_def
        root.add_child(content_object=var_def)
        root = reload_node(root)

    ifstatement = root.add_child(content_object=IfStatement())

    for condition_var, assignment_var in pairs(vars[:branches_count - branches_count % 2]):
        if use_binary_operator:
            binary_operator = ifstatement.add_child(content_object=BinaryOperator(operator='&'))
            for _ in range(2):
                binary_operator.add_child(content_object=Variable(definition=var_defs[condition_var]))
                binary_operator = reload_node(binary_operator)
        else:
            ifstatement.add_child(content_object=Variable(definition=var_defs[condition_var]))

        ifstatement = reload_node(ifstatement)

        assignment = ifstatement.add_child(content_object=Assignment())

        assignment.add_child(content_object=Variable(definition=var_defs[assignment_var]))
        assignment = reload_node(assignment)
        assignment.add_child(content_object=BooleanConstant(value=True))

        ifstatement = reload_node(ifstatement)

    if branches_count % 2:
        assignment = ifstatement.add_child(content_object=Assignment())
        assignment.add_child(content_object=Variable(definition=var_defs['ElseEnter']))
        assignment = reload_node(assignment)
        assignment.add_child(content_object=BooleanConstant(value=True))

    return reload_node(root), var_defs
