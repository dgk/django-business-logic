from django.urls import include, re_path
from django.contrib import admin

urlpatterns = [
    re_path('^admin/', admin.site.urls),
    re_path('^nested_admin/', include('nested_admin.urls')),
    re_path('^business-logic/', include('business_logic.urls')),
]
