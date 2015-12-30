# -*- coding: utf-8 -*-
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination

try:
    from django.apps import apps
    get_model = apps.get_model
except ImportError:
    from django.db.models.loading import get_model

from rest_framework.decorators import api_view
from rest_framework import generics, exceptions
from rest_framework.response import Response

from .serializers import *
from ..models import ProgramVersion


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


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = 'page_size'
    max_page_size = 1000


class ReferenceList(generics.ListAPIView):
    serializer_class = ReferenceListSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        return self.get_reference_model().objects.all()

    def get_reference_model(self):
        try:
            app_name, model_name = self.kwargs['model'].split('.')
            model = get_model(app_name, model_name)
            ReferenceDescriptor.objects.get(content_type=ContentType.objects.get_for_model(model))
        except (ValueError, LookupError, ReferenceDescriptor.DoesNotExist):
            raise exceptions.NotFound()

        return model


class ProgramTypeView(generics.RetrieveAPIView):
    queryset = ProgramType.objects.all()
    serializer_class = ProgramTypeSerializer


def program_version_view(request, pk):
    program_version = get_object_or_404(ProgramVersion, pk=pk)
    return HttpResponse(program_version.xml(), content_type="application/xml")
