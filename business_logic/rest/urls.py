# -*- coding: utf-8 -*-
from django.conf.urls import url

from .views import *

urlpatterns = [
    url('^$', api_root, name='root'),

    url('^program-interface$', ProgramInterfaceList.as_view(), name='program-interface-list'),
    url('^program-interface/(?P<pk>\d+)$', ProgramInterfaceView.as_view(), name='program-interface'),

    url('^program$', ProgramList.as_view(), name='program-list'),

    url('^program-version$', ProgramVersionList.as_view(), name='program-version-list'),
    url('^program-version/new$', ProgramVersionCreate.as_view(), name='program-version-create'),
    url('^program-version/(?P<pk>\d+)$', ProgramVersionView.as_view(), name='program-version'),

    url('^execution$', ExecutionList.as_view(), name='execution-list'),
    url('^execution/(?P<pk>\d+)$', ExecutionView.as_view(), name='execution'),

    url('^execution/(?P<execution__id>\d+)/log$', LogView.as_view(), name='log'),

    url('^reference$', ReferenceDescriptorList.as_view(), name='reference-descriptor-list'),
    url('^reference/(?P<model>[\w.]+)$', ReferenceList.as_view(), name='reference-list'),
    url('^reference/(?P<model>[\w.]+)/(?P<pk>\d+)$', ReferenceView.as_view(), name='reference'),
]

