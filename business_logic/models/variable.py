# -*- coding: utf-8 -*-

from django.db import models
from django.utils.translation import gettext_lazy as _



class VariableDefinition(models.Model):
    name = models.TextField(_('Variable name'), blank=False, null=False)

    class Meta:
        verbose_name = _('Variable definition')
        verbose_name_plural = _('Variable definitions')

    def __str__(self):
        return self.name

    def interpret(self, ctx):
        pass



class Variable(models.Model):
    """
    
    """
    definition = models.ForeignKey(VariableDefinition, related_name='variables', on_delete=models.CASCADE)

    class Meta:
        verbose_name = _('Variable')
        verbose_name_plural = _('Variables')

    
    class Undefined(object):

        def __nonzero__(self):
            """
            Called to implement truth value testing for python 2
            :return: always False
            """
            return False

        def __bool__(self):
            """
            Called to implement truth value testing for python 3
            :return: always False
            """
            return False

        def __str__(self):
            return 'Undefined'

    def __str__(self):
        return self.definition.name

    def interpret(self, ctx):
        return ctx.get_variable(self.definition)
