# -*- coding: utf-8 -*-
#

from decimal import Decimal

from django.db import models


class Model(models.Model):
    int_value = models.PositiveIntegerField('Integer value', default=1)
    decimal_value = models.DecimalField('Decimal value', max_digits=10, decimal_places=4, default=Decimal('2.0'))
    string_value = models.CharField(max_length=255)
    date_value = models.DateField(null=True, blank=True)
    datetime_value = models.DateTimeField(null=True, blank=True)
    foreign_value = models.ForeignKey('RelatedModel', null=True)

    class Meta:
        ordering = ('id',)
        verbose_name = 'Test Model'
        verbose_name_plural = 'Test Models'


class RelatedModel(models.Model):
    int_value = models.PositiveIntegerField('Integer value', default=2)
    string_value = models.CharField('string value', max_length=255, default='foreign_value.string_value')

    class Meta:
        ordering = ('id',)
        verbose_name = 'Test Related Model'
        verbose_name_plural = 'Test Related Models'
