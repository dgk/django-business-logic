# -*- coding: utf-8 -*-
#

from django.test import TestCase
from ..models import *

class MessageTest(TestCase):
    fixtures = ['contenttypes.json', 'messages.json', ]
    def test_interpret(self):
        context = Context()
        message = Message.objects.get(id=1)
        root = Node.add_root(content_object=message)
        root.interpret(context)
        messages = context.result.messages
        self.failUnlessEqual(1, messages.all().count())
        self.failUnlessEqual(1, messages.all()[0].message_id)



