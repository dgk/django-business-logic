# -*- coding: utf-8 -*-
#

from ..models import *
from utils import tree_1plus2mul3


def create_test_data():
    def reload(node):
        return Node.objects.get(id=node.id)

    err_msg_type = MessageType.objects.get(id=1)
    warn_msg_type = MessageType.objects.get(id=2)
    root = Node.add_root()
    first_block = reload(root.add_child(comment='First block'))
    first_block.add_child(content_object=Message(type=err_msg_type,
                text='Error message text'))
    first_block.add_child(content_object=Message(type=warn_msg_type,
                text='Warning message text'))
    first_block.add_child(content_object=StopInterpretation())
    second_block = reload(root.add_child(comment='Second block'))
    variable_definition = VariableDefinition(name='Variable 1')
    second_block.add_child(content_object=variable_definition)
    assignment = reload(second_block.add_child(content_object=Assignment()))
    assignment.add_child(content_object=Variable(definition=variable_definition))
    assignment = reload(assignment)
    tree_1plus2mul3(parent=assignment)

    print root.id


if __name__ == '__main__':
    import settings # Assumed to be in the same directory.
    from program import models
    import django.conf
    create_test_data()


