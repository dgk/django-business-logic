# -*- coding: utf-8 -*-
#


from django.test import TestCase
from django.conf import settings
from django.db import connection

from ..models import *
from utils import *



class ContextTest(TestCase):
    def test_default_init(self):
        context = Context()
        self.failIf(context.config.logging)

    def test_init(self):
        context = Context(logging=True)
        self.failUnless(context.config.logging)

    def test_result_init(self):
        context = Context()
        self.failUnless(isinstance(context.result, Result))
        self.failUnless(context.result.id)
