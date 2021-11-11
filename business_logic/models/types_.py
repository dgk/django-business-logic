# -*- coding: utf-8 -*-
#

from django.db import models
from django.utils.translation import gettext_lazy as _

from .constant import BooleanConstant
from .constant import NumberConstant
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
    'model': (models.ForeignKey,),
    'date': (models.DateField,),
    'datetime': (models.DateTimeField,),
}

TYPES_FOR_DJANGO_FIELDS = {}

for _type, fields in DJANGO_FIELDS_FOR_TYPES.items():
    for field in fields:
        TYPES_FOR_DJANGO_FIELDS[field] = _type
