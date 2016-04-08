# -*- coding: utf-8 -*-

from django.contrib import admin

from nested_inline.admin import NestedStackedInline, NestedModelAdmin

from business_logic.models import ProgramType, ProgramArgument, ProgramArgumentField

# register all app models for debug purposes
# for model in apps.get_app_config('business_logic').get_models():
#     admin.site.register(model)


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

