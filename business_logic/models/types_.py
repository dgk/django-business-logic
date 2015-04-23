# -*- coding: utf-8 -*-
#

from django.db import models
from django.utils.translation import gettext as _
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
