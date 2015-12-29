# -*- coding: utf-8 -*-
try:
    from django.apps import apps
    get_model = apps.get_model
except ImportError:
    from django.db.models.loading import get_model


from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.response import Response


from .serializers import *


def format_url(_url):
    return 'business-logic:rest:{}'.format(_url)


@api_view(('GET',))
def api_root(request, format=None):
    from rest_framework.reverse import reverse

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


class ReferenceList(generics.ListAPIView):
    serializer_class = ReferenceListSerializer

    def get_queryset(self):
        return self.get_reference_model().objects.all()

    def get_reference_model(self):
        app_name, model_name = self.kwargs['model'].split('.')
        return get_model(app_name, model_name)


class ProgramTypeView(generics.RetrieveAPIView):
    queryset = ProgramType.objects.all()
    serializer_class = ProgramTypeSerializer

