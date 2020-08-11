# -*- coding: utf-8 -*-
#

from django.utils.translation import gettext_lazy as _

from ..utils import pairs

from .node import NodeAccessor


class IfStatement(NodeAccessor):
    interpret_children = True

    class Meta:
        verbose_name = _('If statement')
        verbose_name_plural = _('If statements')

    def interpret(self, ctx):
        children = ctx.get_children(self.node)

        for pair in pairs(children):
            # last "else" branch
            if len(pair) == 1:
                return pair[0].interpret(ctx)

            if pair[0].interpret(ctx):
                return pair[1].interpret(ctx)
