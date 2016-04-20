# -*- coding: utf-8 -*-
from django.contrib.contenttypes.models import ContentType


def pairs(iterable):
    # split iterable into two element chunks
    return [iterable[i:i + 2] for i in range(0, len(iterable), 2)]

def get_content_type_id(model):
    return ContentType.objects.get_for_model(model).id
