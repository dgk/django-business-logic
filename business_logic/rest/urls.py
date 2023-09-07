# -*- coding: utf-8 -*-
from django.urls import re_path

from .views import *

urlpatterns = [
    re_path(r'^$', api_root, name='root'),
    re_path(r'^program-interface$', ProgramInterfaceList.as_view(), name='program-interface-list'),
    re_path(r'^program-interface/(?P<pk>\d+)$', ProgramInterfaceView.as_view(), name='program-interface'),
    re_path(r'^program$', ProgramList.as_view(), name='program-list'),
    re_path(r'^program/(?P<pk>\d+)$', ProgramView.as_view(), name='program'),
    re_path(r'^program-version$', ProgramVersionList.as_view(), name='program-version-list'),
    re_path(r'^program-version/new$', ProgramVersionCreate.as_view(), name='program-version-create'),
    re_path(r'^program-version/(?P<pk>\d+)$', ProgramVersionView.as_view(), name='program-version'),
    re_path(r'^execution$', ExecutionList.as_view(), name='execution-list'),
    re_path(r'^execution/(?P<pk>\d+)$', ExecutionView.as_view(), name='execution'),
    re_path(r'^execution/(?P<execution__id>\d+)/log$', LogView.as_view(), name='log'),
    re_path(r'^reference$', ReferenceDescriptorList.as_view(), name='reference-descriptor-list'),
    re_path(r'^reference/(?P<model>[\w.]+)$', ReferenceList.as_view(), name='reference-list'),
    re_path(r'^reference/(?P<model>[\w.]+)/(?P<pk>\d+)$', ReferenceView.as_view(), name='reference'),
]
