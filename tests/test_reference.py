# -*- coding: utf-8 -*-

from .common import *


class ReferenceDescriptorTest(TestCase):
    def setUp(self):
        self.content_type = ContentType.objects.get_for_model(TestModel)

    def test_reference_descriptor_search_fields_empty(self):
        reference_descriptor = ReferenceDescriptor.objects.create(content_type=self.content_type)
        self.assertEqual([], reference_descriptor.get_search_fields())

    def test_reference_descriptor_search_fields_split(self):
        reference_descriptor = ReferenceDescriptor.objects.create(content_type=self.content_type,
                                                                  search_fields='xxx,    yyy zzz; aa_bb__cc')
        self.assertEqual(['xxx', 'yyy', 'zzz', 'aa_bb__cc'], reference_descriptor.get_search_fields())
