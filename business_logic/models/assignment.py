# -*- coding: utf-8 -*-
#

from django.utils.translation import ugettext_lazy as _

from .node import NodeAccessor


class Assignment(NodeAccessor):
    """
    Assignment value to variable
    """
    class Meta:
        verbose_name = _('Assignment')
        verbose_name_plural = _('Assignments')

    def __str__(self):
        return '='

    def interpret(self, ctx, lhs, rhs):
        """
        Interpret assignment

        Args:
            ctx(:class:`business_logic.models.Context`): execution context
            lhs(:class:`business_logic.models.Variable`): assignment variable
            rhs: right hand side value

        Returns:
            rhs value
        """
        lhs_node = ctx.get_children(self.node)[0]
        ctx.set_variable(lhs_node.content_object.definition, rhs)
        return rhs
