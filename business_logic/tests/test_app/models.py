# -*- coding: utf-8 -*-
#


from django.db import models


class TestModel(models.Model):
    int_value = models.PositiveIntegerField('value', default=0)
    string_value = models.CharField('string value', max_length=255)
    foreign_value = models.ForeignKey('TestRelatedModel', null=True)


class TestRelatedModel(models.Model):
    string_value = models.CharField('string value', max_length=255, default='test')


