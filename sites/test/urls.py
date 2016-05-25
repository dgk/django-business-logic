from django.conf.urls import include, url

urlpatterns = [
    url('^business-logic/', include('business_logic.urls')),
]
