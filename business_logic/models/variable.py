# -*- coding: utf-8 -*-

from django.db import models
from django.utils.encoding import python_2_unicode_compatible, force_text
from django.utils.translation import ugettext_lazy as _


@python_2_unicode_compatible
class VariableDefinition(models.Model):
    name = models.TextField(_('Variable name'), blank=False, null=False)

    class Meta:
        verbose_name = _('Variable definition')
        verbose_name_plural = _('Variable definitions')

    def __str__(self):
        return self.name

    def interpret(self, ctx):
        pass


@python_2_unicode_compatible
class Variable(models.Model):
    definition = models.ForeignKey(VariableDefinition, related_name='variables')

    class Meta:
        verbose_name = _('Variable')
        verbose_name_plural = _('Variables')

    @python_2_unicode_compatible
    class Undefined(object):

        def __nonzero__(self):
            return False

        def __bool__(self):
            return False

        def __str__(self):
            return force_text(_('Undefined'))

    def __str__(self):
        return self.definition.name

    def interpret(self, ctx):
        return ctx.get_variable(self.definition)
