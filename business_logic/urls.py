# -*- coding: utf-8 -*-
from django.conf.urls import url, include

urlpatterns = [url(r'^rest/', include(('business_logic.rest.urls', 'business_logic'), namespace='rest'))]

urlpatterns = [url('', include((urlpatterns, 'business_logic'), namespace='business-logic'))]
