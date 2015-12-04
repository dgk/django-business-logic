# -*- coding: utf-8 -*-

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

def url(_url):
    return 'business-logic:rest:{}'.format(_url)


@api_view(('GET',))
def api_root(request, format=None):
    return Response({
        #'users': reverse(url('user-list'), request=request, format=format),
    })
