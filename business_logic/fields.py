# -*- coding: utf-8 -*-

from django.db import models

from .validators import validate_field_name


class DeepAttributeField(models.CharField):
    default_validators = [validate_field_name, ]