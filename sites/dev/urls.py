from django.conf.urls import include, url
from django.contrib import admin
from django.shortcuts import redirect

urlpatterns = [
    url('^admin/', include(admin.site.urls)),
    url('^business-logic/', include('business_logic.urls')),
    url('^books/', include('sites.dev.books.urls')),
    url('.*', lambda x: redirect('/books/book')),
]
