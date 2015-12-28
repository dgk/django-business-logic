# -*- coding: utf-8 -*-

from rest_framework import serializers

from business_logic.models import ProgramType


class ProgramTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramType
