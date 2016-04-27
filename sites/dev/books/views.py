# -*- coding: utf-8 -*-
from django.views import generic

from .models import *


class AuthorList(generic.ListView):
    model = Author


class BookList(generic.ListView):
    model = Book


class PublisherList(generic.ListView):
    model = Publisher


class AuthorCreate(generic.CreateView):
    model = Author
    template_name = 'books/form.html'
    success_url = '/books/author'
    fields = (
        'first_name',
        'last_name',
        'email',
    )


class PublisherCreate(generic.CreateView):
    model = Publisher
    template_name = 'books/form.html'
    success_url = '/books/publisher'
    fields = (
        'name',
    )


class BookCreate(generic.CreateView):
    model = Book
    template_name = 'books/form.html'
    success_url = '/books/book'
    fields = (
        'title',
        'authors',
        'publisher',
        'publication_date',
        'price',
    )

