# -*- coding: utf-8 -*-
from django.conf.urls import url, include
from rest_framework import routers

from .views import *

router = routers.SimpleRouter(trailing_slash=False)
#router.register(r'users', UserViewSet)
#router.register(r'accounts', AccountViewSet)
urlpatterns = router.urls
urlpatterns = [
    url('^$', api_root, name='root'),

    url('^program-interface$', ProgramInterfaceList.as_view(), name='program-interface-list'),
    url('^program-interface/(?P<pk>\d+)$', ProgramInterfaceView.as_view(), name='program-interface'),

    url('^program$', ProgramList.as_view(), name='program-list'),

    url('^program-version$', ProgramVersionList.as_view(), name='program-version-list'),
    url('^program-version/new$', ProgramVersionCreate.as_view(), name='program-version-create'),
    url('^program-version/(?P<pk>\d+)$', ProgramVersionView.as_view(), name='program-version'),

    url('^reference/descriptor$', ReferenceDescriptorList.as_view(), name='reference-descriptor-list'),
    url('^reference/list/(?P<model>[\w.]+)$', ReferenceList.as_view(), name='reference-list'),
]

