# -*- coding: utf-8 -*-
from django.views import generic

from business_logic.models import Program

from .models import *


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


class AuthorList(generic.ListView):
    model = Author


class BookList(generic.ListView):
    model = Book


class PublisherList(generic.ListView):
    model = Publisher


class PublisherDetail(generic.DetailView):
    model = Publisher

class BookDetail(generic.DetailView):
    model = Book

    def get_object(self, queryset=None):
        book = super(BookDetail, self).get_object(queryset)
        program = Program.objects.get(name='on_book_view')
        version = program.versions.first()

        version.interpret(book=book)
        book.publisher.save()

        return book

