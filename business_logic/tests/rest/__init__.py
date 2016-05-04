# -*- coding: utf-8 -*-
from .common import *

from .program_interface import *
from .program_version import *
from .reference import *


class RestTestCase(TestCase):
    def test_urls(self):
        url = reverse('business-logic:rest:root')
        #print url


