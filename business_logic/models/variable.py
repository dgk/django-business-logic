# -*- coding: utf-8 -*-
#

from django.db import models
from django.utils.encoding import smart_unicode
from django.utils.translation import ugettext_lazy as _


class VariableDefinition(models.Model):
    name = models.TextField(_('Variable name'), blank=False, null=False)
    class Meta:
        verbose_name = _('Variable definition')
        verbose_name_plural = _('Variable definitions')

    def __unicode__(self):
        return smart_unicode(self.value)

    def interpret(self, ctx):
        pass

class Variable(models.Model):
    definition = models.ForeignKey(VariableDefinition, related_name='variables')

    class Meta:
        verbose_name = _('Variable')
        verbose_name_plural = _('Variables')

    def __unicode__i(self):
        return smart_unicode(self.value)

    def interpret(self, ctx):
        return ctx.get_variable(self.definition_id)

