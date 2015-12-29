# -*- coding: utf-8 -*-

from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse

from .serializers import *


def format_url(_url):
    return 'business-logic:rest:{}'.format(_url)


@api_view(('GET',))
def api_root(request, format=None):
    return Response({
        'program-type': reverse(format_url('program-type-list'), request=request, format=format),
        'reference-descriptor': reverse(format_url('reference-descriptor-list'), request=request, format=format),
    })


class ProgramTypeList(generics.ListAPIView):
    queryset = ProgramType.objects.all()
    serializer_class = ProgramTypeListSerializer


class ReferenceDescriptorList(generics.ListAPIView):
    queryset = ReferenceDescriptor.objects.all()
    serializer_class = ReferenceDescriptorListSerializer


class ProgramTypeView(generics.RetrieveAPIView):
    queryset = ProgramType.objects.all()
    serializer_class = ProgramTypeSerializer

