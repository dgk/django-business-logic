# -*- coding: utf-8 -*-
from django.contrib.contenttypes.models import ContentType
from django.db.models import Q

from ..models import Node, ProgramVersion, Variable, VariableDefinition
from ..utils import get_content_type_id

from .exceptions import NodeTreeCreatorException


class NodeTreeCreator(object):

    def create(self, data, program_version=None):

        def is_block(__data):
            return 'content_type' not in __data['data']

        if program_version is not None:
            if not isinstance(program_version, ProgramVersion):
                raise NodeTreeCreatorException('Invalid program_version argument type')

            program_interface = program_version.program.program_interface
            external_variable_definitions = VariableDefinition.objects.filter(
                Q(program_argument__program_interface=program_interface) |
                Q(program_argument_field__program_argument__program_interface=program_interface)).order_by(
                    'name').distinct()
        else:
            external_variable_definitions = None

        variable_definitions = self.create_variable_definitions(data, external_variable_definitions)
        if not is_block(data):
            data = {'data': {}, 'children': [data]}

        data['children'] = variable_definitions + data['children']

        def create_content_object(_data):
            if not is_block(_data):
                self.create_content_object(_data['data'])

            for child in _data.get('children', []):
                create_content_object(child)

        create_content_object(data)

        return Node.objects.get(id=Node.load_bulk([
            data,
        ])[0])

    def collect_objects(self, data, content_type_id):
        """
        :param data: dictionary returned from BlocklyXmlParser.parse()
        :type data: dict
        :param content_type_id:
        :type content_type_id: integer
        :return: list of nodes with given content_type
        :rtype: list
        """
        collection = []

        def collect(item):
            if item['data'].get('content_type') == content_type_id:
                collection.append(item)
            children = item.get('children', [])
            for child in children:
                collect(child)

        collect(data)
        return collection

    def create_content_object(self, data):
        content_type = ContentType.objects.get(id=data['content_type'])
        model_class = content_type.model_class()

        if 'object_id' in data:
            return

        if model_class == VariableDefinition:
            return

        node_kwargs = [x.name for x in Node._meta.get_fields()]
        content_object_kwargs = dict(((k, v) for k, v in data.items() if k not in node_kwargs))

        object = model_class.objects.create(**content_object_kwargs)
        data['object_id'] = object.id
        for kwarg in content_object_kwargs.keys():
            del data[kwarg]

        return data

    def create_variable_definitions(self, data, external_variable_definitions=None):
        variable_definitions = []
        variable_by_name = {}

        if external_variable_definitions is not None:
            for variable_definition in external_variable_definitions:
                if not isinstance(variable_definition, VariableDefinition):
                    raise NodeTreeCreatorException('Invalid variable_definition argument type')

                variable_by_name[variable_definition.name] = dict(
                    variables=[], variable_definition=variable_definition.id)

        variables = self.collect_objects(data, get_content_type_id(Variable))

        for variable in variables:
            variable_name = variable['data']['name']
            if variable_name not in variable_by_name:
                variable_definition_id = VariableDefinition.objects.create(name=variable_name).id
                variable_definition = {
                    'data': {
                        'content_type': get_content_type_id(VariableDefinition),
                        'object_id': variable_definition_id
                    }
                }
                variable_definitions.append(variable_definition)
                variable_by_name[variable_name] = dict(variables=[], variable_definition=variable_definition_id)
            else:
                variable_definition_id = variable_by_name[variable_name]['variable_definition']

            variable_by_name[variable_name]['variables'].append(variable)
            del variable['data']['name']
            variable['data']['definition_id'] = variable_definition_id

        return variable_definitions
