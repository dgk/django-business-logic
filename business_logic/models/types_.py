# -*- coding: utf-8 -*-
#

from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.contenttypes.models import ContentType

from node import NodeAccessor
from constant import BooleanConstant
from constant import DecimalConstant
from constant import FloatConstant
from constant import IntegerConstant
from constant import ModelConstant
from constant import StringConstant

CONSTANTS_FOR_TYPES = {
        'bool': BooleanConstant,
        'decimal': DecimalConstant,
        'float': FloatConstant,
        'int': IntegerConstant,
        'string': StringConstant,
        }

TYPE_CHOICES = (
        ('bool', _('Boolean')),
        ('decimal', _('Decimal')),
        ('float', _('Float')),
        ('int', _('Integer')),
        ('string', _('String')),
        ('model', _('Model')),
        )

DJANGO_FIELDS_FOR_TYPES = {
    'bool': (
        models.BooleanField,
        models.NullBooleanField,
    ),
    'decimal': (
        models.DecimalField,
    ),
    'float': (
        models.FloatField,
    ),
    'int': (
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
