# -*- coding: utf-8 -*-

from rest_framework import serializers

from business_logic.models import ProgramType, ProgramArgumentField, ProgramArgument


class ProgramTypeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramType


class ProgramArgumentFieldSerializer(serializers.ModelSerializer):
    data_description = serializers.SerializerMethodField()

    class Meta:
        model = ProgramArgumentField
        exclude = ('program_argument', 'id')

    def get_data_description(self, obj):
        pass
    
class ProgramArgumentSerializer(serializers.ModelSerializer):
    field = ProgramArgumentFieldSerializer(many=True)

    class Meta:
        model = ProgramArgument


class ProgramTypeSerializer(serializers.ModelSerializer):
    argument = ProgramArgumentSerializer(many=True)

    class Meta:
        model = ProgramType
