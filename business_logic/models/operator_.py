# -*- coding: utf-8 -*-
#

import operator

from decimal import Decimal

from django.db import models

from django.utils.translation import gettext_lazy as _

from .node import NodeAccessor


class Operator(NodeAccessor):
    operator = models.CharField(_('Operator'), null=False, max_length=3)
    operator_table = {}

    def _check_operator(self):
        if self.operator not in self.operator_table:
            raise TypeError('Incorrect operator "{operator}" for class {cls}'.format(
                operator=self.operator, cls=self.__class__.__name__))

    def __init__(self, *args, **kwargs):
        super(Operator, self).__init__(*args, **kwargs)
        if not self.id and self.operator:
            self._check_operator()

    def save(self, *args, **kwargs):
        self._check_operator()
        return super(Operator, self).save(*args, **kwargs)

    def __str__(self):
        return self.operator

    class Meta:
        abstract = True


class BinaryOperator(Operator):
    """
    Implements binary operations.

    Supported operators are:

        * ``+``
        * ``-``
        * ``*``
        * ``/``
        * ``^``
        * ``%``
        * ``&``
        * ``|``
        * ``==``
        * ``!=``
        * ``>``
        * ``>=``
        * ``<``
        * ``<=``
        * ``in``

    """
    operator_table = {
        '+': operator.add,
        '-': operator.sub,
        '*': operator.mul,
        '/': operator.floordiv,
        '^': operator.pow,
        #
        '%': operator.mod,
        #
        '&': operator.and_,
        '|': operator.or_,
        #
        '==': operator.eq,
        '!=': operator.ne,
        '>': operator.gt,
        '>=': operator.ge,
        '<': operator.lt,
        '<=': operator.le,
        #
        'in': operator.contains,
    }

    def interpret(self, ctx, *args):

        def is_decimal(value):
            return isinstance(value, Decimal)

        if len([x for x in args if is_decimal(x)]) == 1:
            args = [Decimal(x) if not is_decimal(x) else x for x in args]

        lhs, rhs = args
        return self.operator_table[self.operator](lhs, rhs)

    class Meta:
        verbose_name = _('Binary operator')
        verbose_name_plural = _('Binary operators')


class UnaryOperator(Operator):
    """
    Implements unary operations.

    Supported operators are:

        * ``-``
        * ``not``
        * ``neg``
        * ``abs``

    """
    class Meta:
        verbose_name = _('Unary operator')
        verbose_name_plural = _('Unary operators')

    operator_table = {
        '-': operator.neg,
        'not': operator.not_,
        'neg': operator.neg,
        'abs': operator.abs,
    }

    def interpret(self, ctx, rhs):
        return self.operator_table[self.operator](rhs)
