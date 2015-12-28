# -*- coding: utf-8 -*-

from .common import *


class ProgramTypeTest(TestCase):
    def setUp(self):
        self.program_type = ProgramType.objects.create()


    def test_urls(self):
        url = reverse('business-logic:rest:root')

    def test_program_type_list(self):
        pass
