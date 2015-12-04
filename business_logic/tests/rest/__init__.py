# -*- coding: utf-8 -*-
from django.core.urlresolvers import reverse
from ..common import *


class RestTestCase(TestCase):
    def test_urls(self):
        url = reverse('business-logic:rest:root')
        #print url
