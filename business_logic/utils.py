# -*- coding: utf-8 -*-
from django.contrib.contenttypes.models import ContentType
from django.db.models import Q


def pairs(iterable):
    # split iterable into two element chunks
    return [iterable[i:i + 2] for i in range(0, len(iterable), 2)]


def get_content_type_id(model):
    return ContentType.objects.get_for_model(model).id


def get_customer_available_content_types():
    # returns ContentType queryset except content types for
    # some django service and this application models

    exclude_choices = Q()
    for app_label in [
        'admin',
        'contenttypes',
        'sessions',

        'business_logic',
    ]:
        exclude_choices |= Q(app_label=app_label)

    return ContentType.objects.exclude(exclude_choices)
