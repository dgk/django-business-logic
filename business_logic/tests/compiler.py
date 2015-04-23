# -*- coding: utf-8 -*-
#


from django.test import TestCase
from django.conf import settings
from django.db import connection

from ..models import *
from utils import *



class CompilerTest(TestCase):
    def test_simple_expr(self):
        code = '''
        a = 112
        '''
        compiler = Compiler()
        compiled = compiler.compileString(code)
        return
        print compiled
        self.failUnless(isinstance(compiled, Node))
