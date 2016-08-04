from django.conf.urls import include, url
from django.contrib import admin, staticfiles
from django.contrib.staticfiles.views import serve as staticfiles_serve
from django.shortcuts import redirect

urlpatterns = [
    url('^admin/', include(admin.site.urls)),
    url('^business-logic/', include('business_logic.urls')),
    url('^books/', include('sites.dev.books.urls')),
    url('^static/', staticfiles_serve),
    url('.*', lambda x: redirect('/books/book')),
]
