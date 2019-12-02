# -*- coding: utf-8 -*-
#

from django.test import TestCase
from django.conf import settings
from django.db import connection

from .common import *


class ContextTest(TestCase):

    def test_default_init(self):
        context = Context()
        self.assertFalse(context.config.log)

    def test_init(self):
        context = Context(log=True)
        self.assertTrue(context.config.log)

    def test_init_args_check(self):
        context = Context(log=True)
        self.assertRaises(TypeError, Context, wtf=True)
