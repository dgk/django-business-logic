# -*- coding: utf-8 -*-
#
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.utils.translation import ugettext_lazy as _


class ReferenceDescriptor(models.Model):
    content_type = models.ForeignKey(ContentType, unique=True)
    search_fields = models.TextField()
    #  TODO: name_field = models.SlugField(max_length=255, null=True, blank=True)

    class Meta:
        verbose_name = _('Reference descriptor')
        verbose_name_plural = _('Reference descriptors')

