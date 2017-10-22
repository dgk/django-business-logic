# -*- coding: utf-8 -*-
from .common import *


class RestTestCase(TestCase):
    def test_urls(self):
        url = reverse('business-logic:rest:root')
