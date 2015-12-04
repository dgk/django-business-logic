# -*- coding: utf-8 -*-
#

from django.db import models
from django.utils.translation import ugettext_lazy as _

from node import NodeAccessor

class Assignment(NodeAccessor):

    class Meta:
        verbose_name = _('Assignment')
        verbose_name_plural = _('Assignments')

    def interpret(self, ctx, lhs, rhs):
        lhs_node = ctx.get_children(self.node)[0]
        ctx.set_variable(lhs_node.content_object.definition_id, rhs)
        return rhs
