# -*- coding: utf-8 -*-
from django.contrib.contenttypes.models import ContentType

from ..models import Variable, VariableDefinition
from ..utils import get_content_type_id

class NodeTreeCreator(object):
    def create(self, data):
        pass

    def collect_objects(self, data, content_type_id):
        '''
        :param data: dictionary returned from BlocklyXmlParser.parse()
        :type data: dict
        :param content_type_id:
        :type content_type_id: integer
        :return: list of nodes with given content_type
        :rtype: list
        '''
        collection = []
        def collect(item):
            if item['data']['content_type'] == content_type_id:
                collection.append(item)
            children = item.get('children', [])
            for child in children:
                collect(child)
        collect(data)
        return collection

    def create_content_object(self, data):
        content_type = ContentType.objects.get(id=data['content_type'])
        model_class = content_type.model_class()
        object = model_class.objects.create()
        data['object_id'] = object.id
        return data

    def create_variable_definitions(self, data):
        variable_definitions = []
        variables = self.collect_objects(data, get_content_type_id(Variable))
        variable_by_name = {}
        for variable in variables:
            variable_name = variable['data']['name']
            if variable_name not in variable_by_name:
                variable_definition_id = VariableDefinition.objects.create(name=variable_name)
                variable_definition = {
                    'data': {
                        'content_type':  get_content_type_id(VariableDefinition),
                        'content_object': variable_definition_id
                    }
                }
                variable_definitions.append(variable_definition)
                variable_by_name[variable_name] = dict(variables=[],
                           variable_definition=variable_definition_id)
            else:
                variable_definition_id = variable_by_name[variable_name]['variable_definition']

            variable_by_name[variable_name]['variables'].append(variable)
            del variable['data']['name']
            variable['data']['variable_definition'] = variable_definition_id

        return variable_definitions




