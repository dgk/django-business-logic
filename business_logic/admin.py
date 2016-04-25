# -*- coding: utf-8 -*-
from django.contrib import admin
from django import forms

from nested_inline.admin import NestedStackedInline, NestedModelAdmin

from .models import ProgramType, ProgramArgument, ProgramArgumentField, Program, ReferenceDescriptor
from .utils import get_customer_available_content_types


class ProgramArgumentFieldInline(NestedStackedInline):
    model = ProgramArgumentField
    extra = 1
    fk_name = 'program_argument'


class ContentTypeHolderForm(forms.ModelForm):
    content_type = forms.ModelChoiceField(
        queryset=get_customer_available_content_types())


class ProgramArgumentInline(NestedStackedInline):
    model = ProgramArgument
    form = ContentTypeHolderForm
    extra = 1
    fk_name = 'program_type'
    inlines = [ProgramArgumentFieldInline]
    exclude = ('variable_definition',)


class ProgramInline(NestedStackedInline):
    model = Program
    extra = 1
    fk_name = 'program_type'


class ContentTypeFilter(admin.RelatedFieldListFilter):
    def field_choices(self, field, request, model_admin):
        return field.get_choices(include_blank=False,
            limit_choices_to={'id__in' :get_customer_available_content_types()})


class ProgramTypeAdmin(NestedModelAdmin):
    model = ProgramType
    inlines = [ProgramArgumentInline, ProgramInline]
    list_filter = (
        ('argument__content_type', ContentTypeFilter),
    )


class ProgramAdmin(admin.ModelAdmin):
    model = Program
    list_filter = (
        'program_type',
        ('program_type__argument__content_type', ContentTypeFilter),
    )


class ReferenceDescriptorAdmin(admin.ModelAdmin):
    model = ReferenceDescriptor
    form = ContentTypeHolderForm


admin.site.register(ProgramType, ProgramTypeAdmin)
admin.site.register(Program, ProgramAdmin)
admin.site.register(ReferenceDescriptor, ReferenceDescriptorAdmin)

# register all app models for debug purposes
# from django.apps import apps
# for model in apps.get_app_config('business_logic').get_models():
#     try:
#         admin.site.register(model)
#     except admin.sites.AlreadyRegistered:
#         pass
