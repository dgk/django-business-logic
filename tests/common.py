# -*- coding: utf-8 -*-

import unittest

from pprint import pprint

from django.test import TestCase
from django.utils import timezone

from business_logic.blockly.build import *
from business_logic.blockly.create import *
from business_logic.blockly.exceptions import *
from business_logic.blockly.parse import *

from business_logic.models import *
from business_logic.utils import *
from business_logic.config import *

from .test_app.models import *
from .utils import *


class ProgramTestBase(TestCase):
    field_list = (
        'int_value',
        'string_value',
        'foreign_value',
        'foreign_value.int_value',
        'foreign_value.string_value',
    )

    def setUp(self):
        self.program_interface = program_interface = ProgramInterface.objects.create(code='test')

        self.argument = ProgramArgument.objects.create(
            program_interface=self.program_interface,
            content_type=ContentType.objects.get_for_model(TestModel),
            name='test_model'
        )

        self.fields = self.create_argument_fields(self.argument)

        self.program = program = Program.objects.create(program_interface=program_interface,
                                                        title='test',
                                                        code='test')
        self.program_version = ProgramVersion.objects.create(program=program,
                                                             entry_point=get_test_tree())

        self.test_model = TestModel.objects.create()

    def create_argument_fields(self, argument):
        fields = {}
        for field in self.field_list:
            fields[field] = ProgramArgumentField.objects.create(
                name=field,
                program_argument=argument,
            )

        return fields
