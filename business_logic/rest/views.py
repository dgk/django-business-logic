# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import operator

from collections import OrderedDict
from functools import reduce

try:
    from django.apps import apps

    get_model = apps.get_model
except ImportError:
    from django.db.models.loading import get_model

from django.db import models

from rest_framework import generics, exceptions

from rest_framework.compat import distinct
from rest_framework.decorators import api_view
from rest_framework.filters import DjangoFilterBackend, SearchFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .serializers import *
from ..models import Node

def format_url(_url):
    return 'business-logic:rest:{}'.format(_url)


@api_view(('GET',))
def api_root(request, format=None):
    from rest_framework.reverse import reverse

    return Response(OrderedDict((
        ('program-interface', reverse(format_url('program-interface-list'), request=request, format=format)),
        ('program', reverse(format_url('program-list'), request=request, format=format)),
        ('program-version', reverse(format_url('program-version-list'), request=request, format=format)),
        ('program-version-create', reverse(format_url('program-version-create'), request=request, format=format)),
        ('reference', reverse(format_url('reference-descriptor-list'), request=request, format=format)),
        ('execution', reverse(format_url('execution-list'), request=request, format=format)),
    )))


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = 'page_size'
    max_page_size = 1000


class ProgramInterfaceList(generics.ListAPIView):
    queryset = ProgramInterface.objects.all()
    serializer_class = ProgramInterfaceListSerializer
    pagination_class = StandardResultsSetPagination


class ProgramInterfaceView(generics.RetrieveAPIView):
    queryset = ProgramInterface.objects.all()
    serializer_class = ProgramInterfaceSerializer


class ProgramList(generics.ListAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramListSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('program_interface', )


class ProgramVersionList(generics.ListAPIView):
    queryset = ProgramVersion.objects.all()
    serializer_class = ProgramVersionListSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('program', )


class ProgramVersionCreate(generics.CreateAPIView):
    queryset = ProgramVersion.objects.all()
    serializer_class = ProgramVersionCreateSerializer


class ProgramVersionView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProgramVersion.objects.all()
    serializer_class = ProgramVersionSerializer

    def perform_update(self, serializer):
        instance = self.get_object()
        instance.entry_point.delete()
        super(ProgramVersionView, self).perform_update(serializer)


class ExecutionList(generics.ListAPIView):
    queryset = Execution.objects.all()
    serializer_class = ExecutionListSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('program_version', )


class ExecutionView(generics.RetrieveDestroyAPIView):
    queryset = Execution.objects.all()
    serializer_class = ExecutionSerializer


class LogView(generics.RetrieveAPIView):
    queryset = LogEntry.objects.all()
    serializer_class = LogSerializer
    lookup_field = 'execution__id'


class ReferenceDescriptorList(generics.ListAPIView):
    queryset = ReferenceDescriptor.objects.all()
    serializer_class = ReferenceDescriptorListSerializer


class ReferenceSearchFilter(SearchFilter):
    def filter_queryset(self, request, queryset, view):
        search_terms = self.get_search_terms(request)
        if not search_terms:
            return queryset

        reference_descriptor = view.get_reference_descriptor()
        search_fields = reference_descriptor.get_search_fields()

        if not search_fields:
            raise exceptions.ValidationError(
                'ReferenceDescriptor for `{}` are not configured: incorrect `search_fields` field'.format(
                    view.get_reference_model_name()))

        orm_lookups = [
            self.construct_search(six.text_type(search_field))
            for search_field in search_fields
            ]

        base = queryset
        for search_term in search_terms:
            queries = [
                models.Q(**{orm_lookup: search_term})
                for orm_lookup in orm_lookups
                ]
            queryset = queryset.filter(reduce(operator.or_, queries))

        if self.must_call_distinct(queryset, search_fields):
            # Filtering against a many-to-many field requires us to
            # call queryset.distinct() in order to avoid duplicate items
            # in the resulting queryset.
            # We try to avoid this if possible, for performance reasons.
            queryset = distinct(queryset, base)
        return queryset


class ReferenceBaseView(object):
    serializer_class = ReferenceSerializer

    def get_queryset(self):
        try:
            self.get_reference_descriptor()
        except ReferenceDescriptor.DoesNotExist:
            raise exceptions.NotFound()

        return self.get_reference_model().objects.all()


    def get_reference_descriptor(self):
        return ReferenceDescriptor.objects.get(content_type=ContentType.objects.get_for_model(self.get_reference_model()))


    def get_reference_model_name(self):
        return self.kwargs['model']


    def get_reference_model(self):
        try:
            app_name, model_name = self.get_reference_model_name().split('.')
            model = get_model(app_name, model_name)
        except (ValueError, LookupError):
            raise exceptions.NotFound()

        return model


class ReferenceList(ReferenceBaseView, generics.ListAPIView):
    pagination_class = StandardResultsSetPagination
    filter_backends = [ReferenceSearchFilter]



class ReferenceView(ReferenceBaseView, generics.RetrieveAPIView):
    serializer_class = ReferenceSerializer
