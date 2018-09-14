# -*- coding: utf-8 -*-
from django.urls import reverse
from django.db import models
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class Publisher(models.Model):
    name = models.CharField(max_length=30, verbose_name='Publisher name')
    rank = models.IntegerField(default=0, verbose_name='Publisher rank')

    class Meta:
        verbose_name = 'Publisher'
        verbose_name_plural = 'Publishers'
        ordering = ('id',)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('publisher-detail', kwargs={'pk': self.pk})


@python_2_unicode_compatible
class Author(models.Model):
    first_name = models.CharField(max_length=30, verbose_name='First name')
    last_name = models.CharField(max_length=40, verbose_name='Last name')
    rank = models.IntegerField(default=0, verbose_name='Rank')

    class Meta:
        verbose_name = 'Author'
        verbose_name_plural = 'Authors'
        ordering = ('id',)

    def __str__(self):
        return u'%s %s' % (self.first_name, self.last_name)

    def get_absolute_url(self):
        return reverse('author-detail', kwargs={'pk': self.pk})


@python_2_unicode_compatible
class Book(models.Model):
    title = models.CharField(max_length=100, verbose_name='Title')
    authors = models.ManyToManyField(Author, verbose_name='Authors')
    publisher = models.ForeignKey(Publisher, related_name='books', verbose_name='Publisher', on_delete=models.CASCADE)
    publication_date = models.DateField(verbose_name='Publication date')
    price = models.FloatField(verbose_name='Price')

    class Meta:
        verbose_name = 'Book'
        verbose_name_plural = 'Books'
        ordering = ('id',)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('book-detail', kwargs={'pk': self.pk})
