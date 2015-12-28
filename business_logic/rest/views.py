# -*- coding: utf-8 -*-

from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse

from business_logic.models import ProgramType
from .serializers import ProgramTypeSerializer


def url(_url):
    return 'business-logic:rest:{}'.format(_url)


@api_view(('GET',))
def api_root(request, format=None):
    return Response({
        'program_type': reverse(url('program_type'), request=request, format=format),
        #'users': reverse(url('user-list'), request=request, format=format),
    })


class ProgramTypeList(generics.ListAPIView):
    """
    Список типов программ

    """
    queryset = ProgramType.objects.all()
    serializer_class = ProgramTypeSerializer
