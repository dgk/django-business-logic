# -*- coding: utf-8 -*-
from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^$', api_root, name='root'),
    url(r'^program-interface$', ProgramInterfaceList.as_view(), name='program-interface-list'),
    url(r'^program-interface/(?P<pk>\d+)$', ProgramInterfaceView.as_view(), name='program-interface'),
    url(r'^program$', ProgramList.as_view(), name='program-list'),
    url(r'^program/(?P<pk>\d+)$', ProgramView.as_view(), name='program'),
    url(r'^program-version$', ProgramVersionList.as_view(), name='program-version-list'),
    url(r'^program-version/new$', ProgramVersionCreate.as_view(), name='program-version-create'),
    url(r'^program-version/(?P<pk>\d+)$', ProgramVersionView.as_view(), name='program-version'),
    url(r'^execution$', ExecutionList.as_view(), name='execution-list'),
    url(r'^execution/(?P<pk>\d+)$', ExecutionView.as_view(), name='execution'),
    url(r'^execution/(?P<execution__id>\d+)/log$', LogView.as_view(), name='log'),
    url(r'^reference$', ReferenceDescriptorList.as_view(), name='reference-descriptor-list'),
    url(r'^reference/(?P<model>[\w.]+)$', ReferenceList.as_view(), name='reference-list'),
    url(r'^reference/(?P<model>[\w.]+)/(?P<pk>\d+)$', ReferenceView.as_view(), name='reference'),
]
