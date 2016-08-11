# -*- coding: utf-8 -*-
#


from django.db import models


class TestModel(models.Model):
    int_value = models.PositiveIntegerField('Integer value', default=1)
    string_value = models.CharField(max_length=255)
    foreign_value = models.ForeignKey('TestRelatedModel', null=True)

    class Meta:
        verbose_name = 'Test Model'
        verbose_name_plural = 'Test Models'


class TestRelatedModel(models.Model):
    int_value = models.PositiveIntegerField('Integer value', default=2)
    string_value = models.CharField('string value', max_length=255, default='foreign_value.string_value')

    class Meta:
        verbose_name = 'Test Related Model'
        verbose_name_plural = 'Test Related Models'



