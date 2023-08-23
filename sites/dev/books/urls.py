# -*- coding: utf-8 -*-
from django.urls import re_path

from .views import *
urlpatterns = [
    re_path(r'author$', AuthorList.as_view()),
    re_path(r'author/add$', AuthorCreate.as_view()),
    #
    re_path(r'publisher$', PublisherList.as_view()),
    re_path(r'publisher/(?P<pk>\d+)$', PublisherDetail.as_view(), name='publisher-detail'),
    re_path(r'publisher/add$', PublisherCreate.as_view()),
    #
    re_path(r'book$', BookList.as_view()),
    re_path(r'book/(?P<pk>\d+)$', BookDetail.as_view(), name='book-detail'),
    re_path(r'book/add$', BookCreate.as_view()),
]
