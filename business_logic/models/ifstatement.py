# -*- coding: utf-8 -*-
#

from django.db import models
from django.utils.translation import ugettext_lazy as _

class IfStatement(models.Model):
    class Meta:
        verbose_name = _('If statement')
        verbose_name_plural = _('If statements')


