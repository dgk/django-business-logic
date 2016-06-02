# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import copy

from django import forms
from django.contrib.contenttypes.models import ContentType
from django.core.urlresolvers import reverse
from django.db import models
from django.utils import six

from rest_framework import serializers

from ..models import ProgramInterface, ProgramArgumentField, ProgramArgument, ReferenceDescriptor, Program, ProgramVersion
from ..models.types_ import TYPES_FOR_DJANGO_FIELDS, DJANGO_FIELDS_FOR_TYPES

from ..blockly.build import BlocklyXmlBuilder
from ..blockly.create import NodeTreeCreator
from ..blockly.parse import BlocklyXmlParser


def get_model_name(content_type):
    return '{}.{}'.format(content_type.app_label, content_type.model_class().__name__)


class ProgramInterfaceListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='business-logic:rest:program-interface')

    class Meta:
        model = ProgramInterface


class ProgramListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program


class ProgramVersionListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='business-logic:rest:program-version')
    class Meta:
        model = ProgramVersion
        read_only_fields = ('is_default', )
        exclude = ('entry_point', )


class ProgramVersionCreateSerializer(serializers.ModelSerializer):
    xml = serializers.CharField(write_only=True)
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = ProgramVersion
        fields = ('title', 'description', 'xml', 'program','id')

    def validate_xml(self, value):
        try:
            BlocklyXmlParser().parse(value)
        except Exception as e:
            raise serializers.ValidationError("Xml parse error - {}: {}".format(e.__class__.__name__, e.message))

        return value

    def create(self, validated_data):
        xml = validated_data.pop('xml')
        node = NodeTreeCreator().create(BlocklyXmlParser().parse(xml)[0])
        validated_data['entry_point'] = node
        return ProgramVersion.objects.create(**validated_data)


class ProgramVersionSerializer(serializers.ModelSerializer):
    xml = serializers.SerializerMethodField()
    class Meta:
        model = ProgramVersion
        exclude = ('entry_point', )


    def get_xml(self, obj):
        return BlocklyXmlBuilder().build(obj.entry_point)


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
        return six.text_type(obj)


class ProgramArgumentFieldSerializer(serializers.ModelSerializer):
    schema = serializers.SerializerMethodField()

    class Meta:
        model = ProgramArgumentField
        exclude = ('program_argument', 'id', 'variable_definition')

    def get_schema(self, obj):
        schema = {}
        argument = obj.program_argument
        model = argument.content_type.model_class()
        field_names = obj.name.split('.')
        verbose_name = []
        for i, field_name in enumerate(field_names):
            field = model._meta.get_field(field_name)
            verbose_name.append(field.verbose_name)
            is_last_field = i == len(field_names) - 1

            if is_last_field:
                schema['data_type'] = TYPES_FOR_DJANGO_FIELDS[field.__class__]

            if field.__class__ in DJANGO_FIELDS_FOR_TYPES['model']:
                model = field.related_model

                if is_last_field:
                    schema['content_type'] = get_model_name(ContentType.objects.get_for_model(model))


        schema['verbose_name'] = '.'.join(verbose_name)

        return schema


class ContentTypeSerializer(serializers.Serializer):
    def to_representation(self, instance):
        return get_model_name(instance)


class ProgramArgumentSerializer(serializers.ModelSerializer):
    fields = ProgramArgumentFieldSerializer(many=True)
    verbose_name = serializers.SerializerMethodField()
    content_type = ContentTypeSerializer()

    class Meta:
        model = ProgramArgument
        exclude = ('id', 'program_interface', 'variable_definition')

    def get_verbose_name(self, obj):
        return obj.content_type.model_class()._meta.verbose_name

class ProgramInterfaceSerializer(serializers.ModelSerializer):
    arguments = ProgramArgumentSerializer(many=True)

    class Meta:
        model = ProgramInterface
        exclude = ('id', )

