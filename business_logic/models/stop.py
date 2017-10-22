# -*- coding: utf-8 -*-
#

from django.db import models
from django.utils.translation import ugettext_lazy as _

from ..exceptions import StopInterpretationException, BreakLoopException


class StopInterpretation(models.Model):
    class Meta:
        verbose_name = _('Stop instruction')
        verbose_name_plural = _('Stop instructions')

    def interpret(self, ctx):
        raise StopInterpretationException()


class BreakLoop(models.Model):
    class Meta:
        verbose_name = _('Break instruction')
        verbose_name_plural = _('Break instructions')

    def interpret(self, ctx):
        raise BreakLoopException()
