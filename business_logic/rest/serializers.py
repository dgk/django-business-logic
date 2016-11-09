# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import copy

from django.contrib.contenttypes.models import ContentType
from django.core.urlresolvers import reverse
from django.utils import six

from rest_framework import serializers

from ..models import (
    Execution,
    ExecutionArgument,
    ExecutionEnvironment,
    ExceptionLog,
    LogEntry,
    ProgramInterface,
    ProgramArgumentField,
    ProgramArgument,
    ReferenceDescriptor,
    Program,
    ProgramVersion
)

from ..models.types_ import TYPES_FOR_DJANGO_FIELDS, DJANGO_FIELDS_FOR_TYPES

from ..blockly.build import BlocklyXmlBuilder
from ..blockly.create import NodeTreeCreator
from ..blockly.parse import BlocklyXmlParser


def get_model_name(content_type):
    return '{}.{}'.format(content_type.app_label, content_type.model_class().__name__)

def get_model_verbose_name(content_type):
    return content_type.model_class()._meta.verbose_name


class ContentTypeSerializer(serializers.Serializer):
    name = serializers.SerializerMethodField()
    verbose_name = serializers.SerializerMethodField()
    id = serializers.IntegerField()

    def get_verbose_name(self, obj):
        return get_model_verbose_name(obj)

    def get_name(self, obj):
        return get_model_name(obj)

class ExecutionEnvironmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExecutionEnvironment
        fields = '__all__'


class ProgramInterfaceListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='business-logic:rest:program-interface')

    class Meta:
        model = ProgramInterface
        fields = '__all__'


class ProgramListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'



class BlocklyXMLSerializer(serializers.CharField):
    def to_representation(self, instance):
        return BlocklyXmlBuilder().build(instance)

    def to_internal_value(self, data):
        return NodeTreeCreator().create(BlocklyXmlParser().parse(data)[0])

    def run_validation(self, data=serializers.empty):
        if data == '' or (self.trim_whitespace and six.text_type(data).strip() == ''):
            if not self.allow_blank:
                self.fail('blank')
            return ''

        (is_empty_value, data) = self.validate_empty_values(data)
        if is_empty_value:
            return data

        try:
            BlocklyXmlParser().parse(data)
        except Exception as e:
            raise serializers.ValidationError(
                ["Xml parse error - {}: {}".format(e.__class__.__name__, six.text_type(e))])

        value = self.to_internal_value(data)
        self.run_validators(value)
        return value


class ProgramInterfaceListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='business-logic:rest:program-interface')

    class Meta:
        model = ProgramInterface
        fields = '__all__'


class ProgramListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'


class ProgramVersionListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='business-logic:rest:program-version')

    class Meta:
        model = ProgramVersion
        read_only_fields = ('is_default', )
        exclude = ('entry_point', )


class ProgramVersionCreateSerializer(serializers.ModelSerializer):
    xml = BlocklyXMLSerializer(source='entry_point', required=True)
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = ProgramVersion
        fields = ('title', 'description', 'xml', 'program', 'id')


class ProgramVersionSerializer(serializers.ModelSerializer):
    xml = BlocklyXMLSerializer(source='entry_point', required=True)
    program = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = ProgramVersion
        exclude = ('entry_point', )


class ReferenceDescriptorListSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    verbose_name = serializers.SerializerMethodField()
    url = serializers.SerializerMethodField()
    content_type = ContentTypeSerializer()

    class Meta:
        model = ReferenceDescriptor
        fields = '__all__'

    def get_name(self, obj):
        return get_model_name(obj.content_type)

    def get_verbose_name(self, obj):
        return obj.content_type.model_class()._meta.verbose_name

    def get_url(self, obj):
        return reverse('business-logic:rest:reference-list', kwargs=dict(model=get_model_name(obj.content_type)))


class ReferenceSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    name = serializers.SerializerMethodField()

    def get_fields(self):
        declared_fields = copy.deepcopy(self._declared_fields)
        return declared_fields

    def get_name(self, obj):
        reference_descriptor = self.context['view'].get_reference_descriptor()
        return six.text_type(getattr(obj, reference_descriptor.name_field) if reference_descriptor.name_field else obj)


class ProgramArgumentFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramArgumentField

    def to_representation(self, instance):
        representation = {}
        representation['name'] = instance.name

        argument = instance.program_argument
        model = argument.content_type.model_class()

        field_names = instance.name.split('.')
        for i, field_name in enumerate(field_names):
            field = model._meta.get_field(field_name)
            is_last_field = i == len(field_names) - 1
            is_django_model = field.__class__ in DJANGO_FIELDS_FOR_TYPES['model']

            if is_django_model:
                model = field.related_model

            if is_last_field:
                representation['data_type'] = TYPES_FOR_DJANGO_FIELDS[field.__class__]
                representation['content_type'] = (
                    ContentTypeSerializer().to_representation(ContentType.objects.get_for_model(model))
                    if is_django_model
                    else None
                )

        representation['verbose_name'] = instance.get_title()

        return representation


class ProgramArgumentSerializer(serializers.ModelSerializer):
    fields = ProgramArgumentFieldSerializer(many=True)
    verbose_name = serializers.SerializerMethodField()
    content_type = ContentTypeSerializer()

    class Meta:
        model = ProgramArgument
        exclude = ('id', 'program_interface', 'variable_definition')

    def get_verbose_name(self, obj):
        return get_model_verbose_name(obj.content_type)


class ProgramInterfaceSerializer(serializers.ModelSerializer):
    arguments = ProgramArgumentSerializer(many=True)

    class Meta:
        model = ProgramInterface
        exclude = ('id', )


class ExecutionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Execution
        exclude = ('log',)

class ExecutionArgumentSerializer(serializers.ModelSerializer):
    content_type = ContentTypeSerializer()
    name = serializers.SerializerMethodField()
    verbose_name = serializers.SerializerMethodField()

    class Meta:
        model = ExecutionArgument
        exclude = ('id', 'program_argument', 'execution')

    def get_name(self, obj):
        return obj.program_argument.name

    def get_verbose_name(self, obj):
        return get_model_verbose_name(obj.content_type)


class ExecutionSerializer(serializers.ModelSerializer):
    arguments = ExecutionArgumentSerializer(many=True)

    class Meta:
        model = Execution
        exclude = ('log',)


class ExceptionLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExceptionLog
        exclude = ('log_entry', 'id')


class LogSerializer(serializers.ModelSerializer):
    exception = ExceptionLogSerializer()

    class Meta:
        model = LogEntry
        exclude = ('sib_order', 'parent', 'id')

    def get_fields(self):
        fields = super(LogSerializer, self).get_fields()
        fields['children'] = LogSerializer(many=True)
        return fields

