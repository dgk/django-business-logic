# -*- coding: utf-8 -*-
from django.contrib import admin

from nested_inline.admin import NestedStackedInline, NestedModelAdmin

from business_logic.models import ProgramType, ProgramArgument, ProgramArgumentField


class ProgramArgumentFieldInline(NestedStackedInline):
    model = ProgramArgumentField
    extra = 1
    fk_name = 'program_argument'


class ProgramArgumentInline(NestedStackedInline):
    model = ProgramArgument
    extra = 1
    fk_name = 'program_type'
    inlines = [ProgramArgumentFieldInline]


class ProgramTypeAdmin(NestedModelAdmin):
    model = ProgramType
    inlines = [ProgramArgumentInline]


admin.site.register(ProgramType, ProgramTypeAdmin)


# register all app models for debug purposes
from django.apps import apps
for model in apps.get_app_config('business_logic').get_models():
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass
