# -*- coding: utf-8 -*-
#

from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.contenttypes.models import ContentType

from .constant import BooleanConstant
from .constant import NumberConstant
from .constant import ModelConstant
from .constant import StringConstant

CONSTANTS_FOR_TYPES = {
        'bool': BooleanConstant,
        'float': NumberConstant,
        'string': StringConstant,
        }

TYPE_CHOICES = (
        ('bool', _('Boolean')),
        ('float', _('Float')),
        ('string', _('String')),
        ('model', _('Model')),
        )

DJANGO_FIELDS_FOR_TYPES = {
    'bool': (
        models.BooleanField,
        models.NullBooleanField,
    ),
    'number': (
        models.FloatField,
        models.DecimalField,
        models.SmallIntegerField,
        models.PositiveSmallIntegerField,
        models.IntegerField,
        models.PositiveIntegerField,
        models.BigIntegerField,
    ),
    'string': (
        models.CharField,
        models.TextField,
    ),
    'model': (
        models.ForeignKey,
    )
}

TYPES_FOR_DJANGO_FIELDS = {}

for type, fields in DJANGO_FIELDS_FOR_TYPES.items():
    for field in fields:
        TYPES_FOR_DJANGO_FIELDS[field] = type


class Type(models.Model):
    type = models.CharField(_('Type'), max_length=12, choices=TYPE_CHOICES,
            blank=False, null=False)
    model_type = models.ForeignKey(ContentType, verbose_name=_('Model type'), null=True)
    is_list = models.BooleanField(_('Is list'))

    class Meta:
        verbose_name = _('Type')
        verbose_name_plural = _('Types')

    @classmethod
    def get_constant_for_type(cls, type):
        if type.type == 'model':
            return type.model_type.model_class()
        return CONSTANTS_FOR_TYPES[type.type]
