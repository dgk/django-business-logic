# -*- coding: utf-8 -*-
#
import re

from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import ugettext_lazy as _


@python_2_unicode_compatible
class ReferenceDescriptor(models.Model):
    content_type = models.OneToOneField(ContentType)
    search_fields = models.TextField(null=True, blank=True)
    name_field = models.SlugField(max_length=255, null=True, blank=True)

    class Meta:
        verbose_name = _('Reference descriptor')
        verbose_name_plural = _('Reference descriptors')

    def __str__(self):
        return str(self.content_type)

    def get_search_fields(self):
        if not self.search_fields:
            return []

        return re.split('[^\w_]+', self.search_fields)