# -*- coding: utf-8 -*-
#

from django.db import models
from django.utils.encoding import smart_unicode
from django.utils.translation import gettext as _

class Table(models.Model):
    class Meta:
        verbose_name = _('Table')
        verbose_name_plural = _('Tables')
