# -*- coding: utf-8 -*-
from django.db import models


class Publisher(models.Model):
    name = models.CharField(max_length=30)
    rank = models.IntegerField(default=0)

    def __unicode__(self):
        return self.name


class Author(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=40)
    rank = models.IntegerField(default=0)

    def __unicode__(self):
        return u'%s %s' % (self.first_name, self.last_name)


class Book(models.Model):
    title = models.CharField(max_length=100)
    authors = models.ManyToManyField(Author)
    publisher = models.ForeignKey(Publisher)
    publication_date = models.DateField()
    price = models.FloatField()

    def __unicode__(self):
        return self.title
