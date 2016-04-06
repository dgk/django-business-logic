# -*- coding: utf-8 -*-

import re

from django.core.validators import RegexValidator
from django.utils.translation import ugettext_lazy as _


field_name_re = re.compile(r'^[a-zA-Z][a-zA-Z0-9_.]+\Z')
validate_field_name = RegexValidator(
    field_name_re,
    _("Enter a valid 'field_name' consisting of letters, numbers, underscores or dots."),
    'invalid'
)