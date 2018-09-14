from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url('^admin/', admin.site.urls),
    url('^business-logic/', include('business_logic.urls')),
]
