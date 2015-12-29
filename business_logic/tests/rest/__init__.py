# -*- coding: utf-8 -*-
from .common import *

from .program_type import *
from .reference import *


class RestTestCase(TestCase):
    def test_urls(self):
        url = reverse('business-logic:rest:root')
        #print url


