# -*- coding: utf-8 -*-
#

from django.utils.translation import ugettext_lazy as _

from .node import NodeAccessor


class IfStatement(NodeAccessor):
    interpret_children = True

    class Meta:
        verbose_name = _('If statement')
        verbose_name_plural = _('If statements')

    def interpret(self, ctx):
        children = ctx.get_children(self.node)
        if_node = children[0]
        if if_node.interpret(ctx):
            children[1].interpret(ctx)

