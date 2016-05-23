from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView

urlpatterns = [
    # Examples:
    # url(r'^$', 'demo.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url('^business-logic/', include('business_logic.urls')),
    url('^books/', include('sites.dev.books.urls')),
    url('^frontend$', TemplateView.as_view(template_name='index.html')),
]
