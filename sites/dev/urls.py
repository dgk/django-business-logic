from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.staticfiles.views import serve as staticfiles_serve
from django.http.response import Http404
from django.shortcuts import redirect
from django.views.defaults import page_not_found

urlpatterns = [
    url('^admin/', admin.site.urls),
    url('^nested_admin/', include('nested_admin.urls')),

    url('^business-logic/', include('business_logic.urls')),
    url('^business-logic/', lambda request: page_not_found(request, Http404())),
    url('^books/', include('sites.dev.books.urls')),
    # url('^(?P<path>static/.*)$', staticfiles_serve),
    url('', lambda x: redirect('/books/book')),
]
