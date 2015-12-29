# -*- coding: utf-8 -*-
import copy
from django.contrib.contenttypes.models import ContentType
from django.core.urlresolvers import reverse
from django.db import models

from rest_framework import serializers

from ..models import ProgramType, ProgramArgumentField, ProgramArgument, ReferenceDescriptor
from ..models.types_ import TYPES_FOR_DJANGO_FIELDS, DJANGO_FIELDS_FOR_TYPES


def get_model_name(content_type):
    return '{}.{}'.format(content_type.app_label, content_type.model_class().__name__)


class ProgramTypeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramType


class ReferenceDescriptorListSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    verbose_name = serializers.SerializerMethodField()
    url = serializers.SerializerMethodField()

    class Meta:
        model = ReferenceDescriptor

    def get_name(self, obj):
        return get_model_name(obj.content_type)

    def get_verbose_name(self, obj):
        return obj.content_type.model_class()._meta.verbose_name

    def get_url(self, obj):
        return reverse('business-logic:rest:reference-list', kwargs=dict(model=get_model_name(obj.content_type)))


class ReferenceListSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    name = serializers.SerializerMethodField()
    def get_fields(self):
        declared_fields = copy.deepcopy(self._declared_fields)
        return declared_fields

    def get_name(self, obj):
        #print self.context['view'].get_reference_model()
        return unicode(obj)


class ProgramArgumentFieldSerializer(serializers.ModelSerializer):
    schema = serializers.SerializerMethodField()

    class Meta:
        model = ProgramArgumentField
        exclude = ('program_argument', 'id')

    def get_schema(self, obj):
        schema = {}
        argument = obj.program_argument
        model = argument.content_type.model_class()
        field_names = obj.name.split('.')
        verbose_name = []
        for field_name in field_names:
            field = model._meta.get_field(field_name)

            schema['data_type'] = TYPES_FOR_DJANGO_FIELDS[field.__class__]

            if field.__class__ in DJANGO_FIELDS_FOR_TYPES['model']:
                model = field.related_model
                related_model_content_type = ContentType.objects.get_for_model(model)
                model_name = get_model_name(related_model_content_type)
                schema['model'] = model_name

            verbose_name.append(field.verbose_name)

        schema['verbose_name'] = '.'.join(verbose_name)

        return schema

class ProgramArgumentSerializer(serializers.ModelSerializer):
    field = ProgramArgumentFieldSerializer(many=True)

    class Meta:
        model = ProgramArgument


class ProgramTypeSerializer(serializers.ModelSerializer):
    argument = ProgramArgumentSerializer(many=True)

    class Meta:
        model = ProgramType
