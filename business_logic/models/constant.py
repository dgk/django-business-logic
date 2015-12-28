# -*- coding: utf-8 -*-
#

from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import ugettext_lazy as _


@python_2_unicode_compatible
class Constant(models.Model):
    class Meta:
        abstract = True

    def __str__(self):
        return str(self.value)

    def interpret(self, ctx):
        return self.value

class IntegerConstant(Constant):
    value = models.IntegerField(_('Value'))

    class Meta:
        verbose_name = _('Integer constant')
        verbose_name_plural = _('Integer constants')


class DecimalConstant(Constant):
    value = models.DecimalField(_('Value'), max_digits=18, decimal_places=4)

    class Meta:
        verbose_name = _('Decimal constant')
        verbose_name_plural = _('Decimal constants')

class FloatConstant(Constant):
    value = models.FloatField(_('Value'))

    class Meta:
        verbose_name = _('Float constant')
        verbose_name_plural = _('Float constants')

class StringConstant(Constant):
    value = models.TextField(_('Value'), default='')

    class Meta:
        verbose_name = _('String constant')
        verbose_name_plural = _('String constants')

class BooleanConstant(Constant):
    value = models.BooleanField(_('Value'))

    class Meta:
        verbose_name = _('Boolean constant')
        verbose_name_plural = _('Boolean constants')

class DateConstant(Constant):
    value = models.DateField(_('Value'))

    class Meta:
        verbose_name = _('Date constant')
        verbose_name_plural = _('Date constants')

class ModelConstant(Constant):
    value = models.BooleanField(_('Value'))

    class Meta:
        verbose_name = _('Model constant')
        verbose_name_plural = _('Model constants')

class ListConstant(Constant):
    class Meta:
        verbose_name = _('List constant')
        verbose_name_plural = _('List constants')

