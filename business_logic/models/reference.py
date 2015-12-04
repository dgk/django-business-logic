# -*- coding: utf-8 -*-
#

import re

from django.db import models
from django.utils.encoding import smart_unicode
from django.utils.translation import ugettext_lazy as _

class Reference(models.Model):
    title = models.CharField(_('Title'), max_length=255, null=False, blank=False)

    class Meta:
        verbose_name = _('Reference')
        verbose_name_plural = _('References')

    def __unicode__(self):
        return unicode(self.title)

    def save(self, *args, **kwargs):
        self.title = Reference.normalize_string(self.title)
        super(Reference, self).save(*args, **kwargs)

    @classmethod
    def normalize_string(cls, str):
        return re.sub(r"\s+", " ", str).strip()
