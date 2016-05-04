# -*- coding: utf-8 -*-

from django.contrib import admin

from .models import *

admin.site.register(Author)
admin.site.register(Book)
admin.site.register(Publisher)
