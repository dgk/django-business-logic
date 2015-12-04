# -*- coding: utf-8 -*-
from django.conf.urls import url, include

from .rest import urls


class Urls:

    urlpatterns = [
        url('^rest/', include(urls, namespace='rest'))
    ]

urlpatterns = [
    url('', include(Urls, namespace='business-logic'))
]
