# -*- coding: utf-8 -*-
#
import re

from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.utils.encoding import python_2_unicode_compatible, force_text
from django.utils.translation import ugettext_lazy as _

from .node import NodeAccessor


@python_2_unicode_compatible
class ReferenceDescriptor(models.Model):
    content_type = models.OneToOneField(ContentType, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, null=True, blank=True)
    search_fields = models.TextField(null=True, blank=True)
    name_field = models.SlugField(max_length=255, null=True, blank=True)

    class Meta:
        verbose_name = _('Reference descriptor')
        verbose_name_plural = _('Reference descriptors')

    def __str__(self):
        return force_text(self.content_type)

    def get_search_fields(self):
        return re.split(r'[^\w_]+', self.search_fields) if self.search_fields else []


class ReferenceConstant(NodeAccessor):
    'A special type of constant that uses the value in the first child node of the node that stores it'
    interpret_children = True

    class Meta:
        verbose_name = _('Reference constant')
        verbose_name_plural = _('Reference constants')

    def interpret(self, ctx):
        return ctx.get_children(self.node)[0].content_object
