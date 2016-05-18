# -*- coding: utf-8 -*-
from django.core.urlresolvers import reverse
from django.db import models
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class Publisher(models.Model):
    name = models.CharField(max_length=30)
    rank = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('publisher-detail', kwargs={'pk': self.pk})


@python_2_unicode_compatible
class Author(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=40)
    rank = models.IntegerField(default=0)

    def __str__(self):
        return u'%s %s' % (self.first_name, self.last_name)

    def get_absolute_url(self):
        return reverse('author-detail', kwargs={'pk': self.pk})


@python_2_unicode_compatible
class Book(models.Model):
    title = models.CharField(max_length=100)
    authors = models.ManyToManyField(Author)
    publisher = models.ForeignKey(Publisher, related_name='books')
    publication_date = models.DateField()
    price = models.FloatField()

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('book-detail', kwargs={'pk': self.pk})
