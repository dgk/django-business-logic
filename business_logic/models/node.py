# -*- coding: utf-8 -*-

from __future__ import unicode_literals, print_function

import inspect
import sys

from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import ugettext_lazy as _

from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

from treebeard.ns_tree import NS_Node

from .. import signals
from ..exceptions import StopInterpretationException


@python_2_unicode_compatible
class Node(NS_Node):
    comment = models.CharField(_('Comment'), max_length=255, null=True, blank=True)
    content_type = models.ForeignKey(ContentType, null=True)
    object_id = models.PositiveIntegerField(null=True)
    content_object = GenericForeignKey('content_type', 'object_id')

    class Meta:
        ordering = ['tree_id', 'lft']
        verbose_name = _('Program node')
        verbose_name_plural = _('Program nodes')

    def __str__(self):
        return 'Node {}({}): {}'.format(self.id, self.content_type, self.content_object)

    @classmethod
    def add_root(cls, **kwargs):
        if 'content_object' in kwargs:
            content_object = kwargs['content_object']
            if not content_object.id:
                content_object.save()
        return super(Node, cls).add_root(**kwargs)

    def delete(self):
        if self.object_id:
            self.content_object.delete()
        for child in self.get_children():
            child.delete()
        return super(Node, self).delete()

    def add_child(self, **kwargs):
        if 'content_object' in kwargs:
            content_object = kwargs['content_object']
            if not content_object.id:
                content_object.save()
        return super(Node, self).add_child(**kwargs)

    def clone(self):
        class CloneVisitor(NodeVisitor):
            def __init__(self):
                self.clone = None

            def visit(self, node):
                if node.object_id:
                    content_object = node.content_object
                    content_object_kwargs = dict([(field.name, getattr(content_object, field.name))
                                                  for field in content_object._meta.fields if
                                                  field.name not in ('id',)])
                    content_object_clone = content_object.__class__(**content_object_kwargs)
                    content_object_clone.save()
                    node_kwargs = dict(content_object=content_object_clone)
                else:
                    node_kwargs = dict()

                if self.clone is None:
                    clone = self.clone = Node.add_root(**node_kwargs)
                    clone.rgt = node.rgt
                    clone.lft = node.lft
                    clone.save()
                else:
                    node_kwargs.update(dict([(field_name, getattr(node, field_name))
                                            for field_name in ('rgt', 'lft', 'depth')]))
                    node_kwargs.update(dict(tree_id=self.clone.tree_id))
                    clone = Node.objects.create(**node_kwargs)
                    clone.save()

        visitor = CloneVisitor()
        visitor.preorder(self)
        return Node.objects.get(id=visitor.clone.id)

    def interpret(self, ctx):
        is_recursive_call = sys._getframe(0).f_code == sys._getframe(1).f_code
        is_block = self.is_block()
        is_content_object_interpret_children_himself = self.is_content_object_interpret_children_himself()

        if is_block:
            signals.block_interpret_enter.send(sender=ctx, node=self)

        signals.interpret_enter.send(sender=ctx, node=self, value=self.content_object)

        children = ctx.get_children(self)

        return_value = None

        if is_block or not is_content_object_interpret_children_himself:
            children_interpreted = []
            for child in children:
                try:
                    children_interpreted.append(child.interpret(ctx))
                except StopInterpretationException:
                    if not is_recursive_call:
                        break
                    else:
                        raise
            if not is_block:
                return_value = self.content_object.interpret(ctx, *children_interpreted)

        else:
            return_value = self.content_object.interpret(ctx)

        signals.interpret_leave.send(sender=ctx, node=self, value=return_value)

        if is_block:
            signals.block_interpret_leave.send(sender=ctx, node=self)

        return return_value

    def is_block(self):
        return not self.is_statement()

    def is_statement(self):
        return self.object_id is not None

    def is_content_object_interpret_children_himself(self):
        return self.object_id is not None and getattr(self.content_object, 'interpret_children', False)

    def pprint(self):
        class PrettyPrintVisitor(NodeVisitor):
            def __init__(self):
                self.str = ''

            def visit(self, node):
                self.str += str(node.content_object)

        visitor = PrettyPrintVisitor()
        visitor.preorder(self)
        print(visitor.str)


class NodeCache:
    def __init__(self):
        self._initialized = False

    def get_children(self, node):
        self.initialize(node)
        return self._child_by_parent_id[node.id]

    def initialize(self, node):
        if not self._initialized:
            self._initialize(node)
            self._initialized = True

    def _initialize(self, node):
        objects_by_ct_id_by_id = {}
        tree = Node.objects.filter(tree_id=node.tree_id)
        content_type_ids = tree.values_list(
            'content_type', flat=True
        ).order_by('content_type').distinct().exclude(content_type__isnull=True)
        content_types = ContentType.objects.filter(id__in=content_type_ids)
        content_type_by_id = {}
        for content_type in content_types:
            content_type_by_id[content_type.id] = content_type
            model = content_type.model_class()
            objects_by_ct_id_by_id[content_type.id] = dict([(x.id, x) for x
                                                            in model.objects.filter(
                    id__in=tree.values_list('object_id',
                                            flat=True).filter(content_type=content_type)
                )])

        tree = list(tree)
        tree[[x.id for x in tree].index(node.id)] = node

        self._node_by_id = dict([(x.id, x) for x in tree])

        for node in tree:
            if node.content_type_id:
                content_object = objects_by_ct_id_by_id[node.content_type_id][node.object_id]
                content_object._node_cache = node
                node._content_object_cache = content_object
                node._content_type_cache = content_type_by_id[node.content_type_id]

        self._child_by_parent_id = {}
        for parent in tree:
            self._child_by_parent_id[parent.id] = [
                node for node in tree
                if node.lft >= parent.lft and
                node.lft <= parent.rgt - 1 and
                node.depth == parent.depth + 1
                ]


class NodeCacheHolder(object):
    def get_children(self, node):
        if not hasattr(self, '_node_cache'):
            self._node_cache = NodeCache()
        return self._node_cache.get_children(node)


class NodeVisitor(NodeCacheHolder):
    def visit(self, node, *args, **kwargs):
        raise NotImplementedError()

    def preorder(self, node, *args, **kwargs):
        self.visit(node, *args, **kwargs)
        for child in self.get_children(node):
            self.preorder(child, *args, **kwargs)

    def postorder(self, node, *args, **kwargs):
        for child in self.get_children(node):
            self.postorder(child, *args, **kwargs)
        self.visit(node, *args, **kwargs)


class NodeAccessor(models.Model):
    @property
    def node(self):
        if hasattr(self, '_node_cache'):
            return self._node_cache

        return Node.objects.get(
                content_type=ContentType.objects.get_for_model(self.__class__),
                object_id=self.id)

    class Meta:
        abstract = True


