# -*- coding: utf-8 -*-
#

from django.contrib import admin
from django.apps import apps

# register all app models for debug purposes
for model in apps.get_app_config('business_logic').get_models():
    admin.site.register(model)

