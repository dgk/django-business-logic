# -*- coding: utf-8 -*-

from rest_framework import serializers

from business_logic.models import ProgramType, ProgramArgumentField, ProgramArgument


class ProgramTypeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramType


class ProgramArgumentFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramArgumentField


class ProgramArgumentSerializer(serializers.ModelSerializer):
    fields = ProgramArgumentFieldSerializer(many=True)

    class Meta:
        model = ProgramArgument


class ProgramTypeSerializer(serializers.ModelSerializer):


    class Meta:
        model = ProgramType
