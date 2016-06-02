# -*- coding: utf-8 -*-
#

from django.db import models
from django.utils.translation import ugettext_lazy as _


class Result(models.Model):
    class Meta:
        verbose_name = _('Result')
        verbose_name_plural = _('Results')

