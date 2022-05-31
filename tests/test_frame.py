# -*- coding: utf-8 -*-
#

from .common import *


class FrameTest(TestCase):

    def test_context_init(self):
        context = Context()
        self.assertTrue(context.frame is None)
        self.assertEqual(context.frames, [])

    def test_single_expression(self):
        root = tree_1plus2mul3()
        context = Context()

        def on_interpret_leave(**kwargs):
            node = kwargs['node']
            if node == root:
                self.assertEqual(1, len(context.frames))
                self.assertTrue(isinstance(context.frame, Frame))
                self.assertTrue(context.frames)
                self.assertEqual(len(context.frames), 1)
                self.assertTrue(context.frame is context.frames[0])

        signals.interpret_leave.connect(on_interpret_leave)
        root.interpret(context)
        self.assertFalse(context.frame)

    def test_switch_frames(self):
        # root + node1 + node1_1
        #      + node2 + node2_1
        root = Node.add_root()
        node1 = root.add_child()
        root = Node.objects.get(id=root.id)
        node2 = root.add_child()
        root = Node.objects.get(id=root.id)
        node1_1 = tree_1plus2mul3(parent=node1)
        node2_1 = symmetric_tree(operator='*', value=5, count=4, parent=node2)
        context = Context()

        def on_interpret_enter(**kwargs):
            node = kwargs['node']
            if node == root:
                self.assertEqual(1, len(context.frames))
            elif node in [node1, node2, node1_1, node2_1]:
                self.assertEqual(2, len(context.frames))

        def on_interpret_leave(**kwargs):
            node = kwargs['node']
            if node == root:
                self.assertEqual(1, len(context.frames))
            elif node in [node1, node2, node1_1, node2_1]:
                self.assertEqual(2, len(context.frames))

        signals.block_interpret_enter.connect(on_interpret_enter)
        signals.interpret_leave.connect(on_interpret_leave)
        root.interpret(context)
        self.assertFalse(context.frame)
        self.assertFalse(context.frames)
