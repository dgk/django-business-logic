# -*- coding: utf-8 -*-
from django.contrib.contenttypes.models import ContentType


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
        variables = self.collect_objects()
        return variable_definitions




