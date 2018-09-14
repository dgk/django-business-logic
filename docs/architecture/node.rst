.. _Node:

Node
====

.. autoclass:: business_logic.models.Node
    :members: clone, pprint, ensure_content_object_saved, add_root, delete, add_child, interpret, is_block, is_statement, is_content_object_interpret_children_itself

.. autoclass:: business_logic.models.NodeCache
    :members: get_children

.. autoclass:: business_logic.models.NodeCacheHolder
    :members: get_children

.. autoclass:: business_logic.models.NodeVisitor
    :members: visit, preorder, postorder
