from django.conf.urls import include
from django.urls import re_path
from django.contrib import admin
from django.contrib.staticfiles.views import serve as staticfiles_serve
from django.http.response import Http404
from django.shortcuts import redirect
from django.views.defaults import page_not_found

urlpatterns = [
    re_path(r'^admin/', admin.site.urls),
    re_path(r'^nested_admin/', include('nested_admin.urls')),

    re_path(r'^business-logic/', include('business_logic.urls')),
    re_path(r'^business-logic/', lambda request: page_not_found(request, Http404())),
    re_path(r'^books/', include('sites.dev.books.urls')),
    # url('^(?P<path>static/.*)$', staticfiles_serve),
    re_path(r'', lambda x: redirect('/books/book')),
]
