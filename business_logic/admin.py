# -*- coding: utf-8 -*-
from django.contrib import admin
from django import forms

from nested_inline.admin import NestedStackedInline, NestedModelAdmin
from polymorphic.admin import PolymorphicChildModelAdmin
from polymorphic.admin import PolymorphicParentModelAdmin

from .models import (
    ProgramInterface,
    ProgramArgument,
    ProgramArgumentField,
    Program,
    ReferenceDescriptor,
    ProgramVersion,
    FunctionDefinition,
    PythonCodeFunctionDefinition,
    PythonModuleFunctionDefinition,
    FunctionLibrary
)
from .utils import get_customer_available_content_types


class ProgramArgumentFieldInline(NestedStackedInline):
    model = ProgramArgumentField
    extra = 1
    fk_name = 'program_argument'
    exclude = ('variable_definition',)


class ContentTypeHolderForm(forms.ModelForm):
    content_type = forms.ModelChoiceField(
        queryset=get_customer_available_content_types())


class ProgramArgumentInline(NestedStackedInline):
    model = ProgramArgument
    form = ContentTypeHolderForm
    extra = 1
    fk_name = 'program_interface'
    inlines = [ProgramArgumentFieldInline]
    exclude = ('variable_definition',)


class ProgramInline(NestedStackedInline):
    model = Program
    extra = 1


class ContentTypeFilter(admin.RelatedFieldListFilter):
    def field_choices(self, field, request, model_admin):
        return field.get_choices(
            include_blank=False,
            limit_choices_to={'id__in': get_customer_available_content_types()}
        )


class ProgramInterfaceAdmin(NestedModelAdmin):
    model = ProgramInterface
    inlines = [ProgramArgumentInline, ProgramInline]
    list_filter = (
        ('arguments__content_type', ContentTypeFilter),
    )


class ProgramAdmin(admin.ModelAdmin):
    model = Program
    list_filter = (
        'program_interface',
        ('program_interface__arguments__content_type', ContentTypeFilter),
    )


class ProgramVersionAdmin(admin.ModelAdmin):
    model = ProgramVersion
    list_filter = (
        'program',
        'program__program_interface',
    )
    readonly_fields = ('program', 'entry_point')

    def has_add_permission(self, request):
        return False


class ReferenceDescriptorAdmin(admin.ModelAdmin):
    model = ReferenceDescriptor
    form = ContentTypeHolderForm


class PythonModuleFunctionDefinitionAdmin(PolymorphicChildModelAdmin):
    base_model = PythonModuleFunctionDefinition


class PythonCodeFunctionDefinitionAdmin(PolymorphicChildModelAdmin):
    base_model = PythonCodeFunctionDefinition


class FunctionDefinitionAdmin(PolymorphicParentModelAdmin):
    base_model = FunctionDefinition
    child_models = (
        PythonCodeFunctionDefinition,
        PythonModuleFunctionDefinition
    )

admin.site.register(ProgramInterface, ProgramInterfaceAdmin)
admin.site.register(Program, ProgramAdmin)
admin.site.register(ProgramVersion, ProgramVersionAdmin)

admin.site.register(ReferenceDescriptor, ReferenceDescriptorAdmin)

admin.site.register(FunctionDefinition, FunctionDefinitionAdmin)
admin.site.register(PythonModuleFunctionDefinition, PythonModuleFunctionDefinitionAdmin)
admin.site.register(PythonCodeFunctionDefinition, PythonCodeFunctionDefinitionAdmin)
admin.site.register(FunctionLibrary)

# register all app models for debug purposes
# from django.apps import apps
# for model in apps.get_app_config('business_logic').get_models():
#     try:
#         admin.site.register(model)
#     except admin.sites.AlreadyRegistered:
#         pass
