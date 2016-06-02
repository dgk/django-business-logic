# -*- coding: utf-8 -*-
#

from importlib import import_module

from django.db import models
from django.utils.translation import ugettext_lazy as _


class FunctionDefinition(models.Model):
    module = models.CharField(_('Module name'), max_length=255, default='__builtins__')

    function = models.CharField(_('Function name'), max_length=255)
    context_required = models.BooleanField(_('Context required'), default=False)
    title = models.CharField(_('Function title'), max_length=255)

    class Meta:
        verbose_name = _('Function definition')
        verbose_name_plural = _('Function definitions')

    def interpret(self, context, *args):
        pass

    def __call__(self, context, *args):
        if not self.module or self.module == '__builtins__':
            code = __builtins__[self.function]
        else:
            module = import_module(self.module)
            code = getattr(module, self.function)
        if self.context_required:
            return code(context, *args)
        return code(*args)


class Function(models.Model):
    definition = models.ForeignKey(FunctionDefinition, related_name='functions')

    class Meta:
        verbose_name = _('Function')
        verbose_name_plural = _('Functions')

    def interpret(self, context, *args):
        return self.definition(context, *args)

