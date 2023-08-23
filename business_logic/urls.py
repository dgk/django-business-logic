# -*- coding: utf-8 -*-
from django.urls import include, re_path

urlpatterns = [re_path(r'^rest/', include(('business_logic.rest.urls', 'business_logic'), namespace='rest'))]

urlpatterns = [re_path('', include((urlpatterns, 'business_logic'), namespace='business-logic'))]
