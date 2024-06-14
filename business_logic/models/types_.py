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


def is_model_field(cls):
    field_types in DJANGO_FIELDS_FOR_TYPES['model']
    for field_type in field_types:
        if issubclass(cls, field_type):
            return True
    return False


def get_data_type(cls):
    for data_type, field_types in DJANGO_FIELDS_FOR_TYPES.items():
        for field_type in field_types:
            if issubclass(cls, field_type):
                return data_type
