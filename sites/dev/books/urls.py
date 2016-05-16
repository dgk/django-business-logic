# -*- coding: utf-8 -*-
from django.conf.urls import url

from .views import *
urlpatterns = [
    url('author$', AuthorList.as_view()),
    url('author/add$', AuthorCreate.as_view()),

    url('publisher$', PublisherList.as_view()),
    url('publisher/add$', PublisherCreate.as_view()),

    url('book$', BookList.as_view()),
    url('book/(?P<pk>\d+)$', BookDetail.as_view()),
    url('book/add$', BookCreate.as_view()),

]