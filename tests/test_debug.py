# -*- coding: utf-8 -*-
#
from business_logic.models.debug import LOG_ENTRY_VALUE_LENGTH

from .common import *
from .test_program import ProgramTestBase


class LogTest(TestCase):
    def test_logger(self):
        context = Context(logging=True)
        self.failUnless(context.logger)
        self.failUnless(context.logger.log is None)

    def test_log_tree(self):
        root = tree_1plus2mul3()

        context = Context(logging=True)
        result = root.interpret(context)

        self.failUnless(context.logger.log)
        self.failUnless(isinstance(context.logger.log, LogEntry))
        self.failUnlessEqual(context.logger.log.node, root)

    def test_log_values(self):
        root = tree_1plus2mul3()

        context = Context(logging=True)
        result = root.interpret(context)

        self.failUnless(context.logger.log)
        self.failUnless(isinstance(context.logger.log, LogEntry))
        self.failUnlessEqual(context.logger.log.node, root)
        self.failUnlessEqual(context.logger.log.previous_value, '+')
        self.failUnlessEqual(context.logger.log.current_value, '7.0')

    def test_log_current_long_values(self):
        add_operator = BinaryOperator(operator='+')
        add_operator.save()

        root = Node.add_root(content_object=add_operator)
        str1 = 'a' * (LOG_ENTRY_VALUE_LENGTH - 4)
        str2 = 'b' * (LOG_ENTRY_VALUE_LENGTH - 4)
        string_const1 = StringConstant(value=str1)
        string_const2 = StringConstant(value=str2)

        root.add_child(content_object=string_const1)
        root = Node.objects.get(id=root.id)

        root.add_child(content_object=string_const2)
        root = Node.objects.get(id=root.id)

        context = Context(logging=True)
        result = root.interpret(context)

        self.failUnlessEqual(context.logger.log.previous_value, '+')
        self.failUnless(context.logger.log.current_value.endswith('aaab...'))

    def test_log_previous_long_values(self):
        add_operator = BinaryOperator(operator='+')
        add_operator.save()

        root = Node.add_root(content_object=add_operator)
        str1 = 'a' * (LOG_ENTRY_VALUE_LENGTH * 2)
        str2 = 'b' * (LOG_ENTRY_VALUE_LENGTH - 4)
        string_const1 = StringConstant(value=str1)
        string_const2 = StringConstant(value=str2)

        root.add_child(content_object=string_const1)
        root = Node.objects.get(id=root.id)

        root.add_child(content_object=string_const2)
        root = Node.objects.get(id=root.id)

        context = Context(logging=True)
        result = root.interpret(context)

        log = LogEntry.objects.get(id=context.logger.log.id)
        self.failUnless(log.get_children()[0].previous_value.endswith('aaa...'))

    def test_log_disabled(self):
        root = tree_1plus2mul3()

        context = Context(logging=False)
        result = root.interpret(context)

        self.failUnless(context.logger.log is None)

    def test_log_block(self):
        root = Node.add_root()
        node1 = tree_1plus2mul3(parent=root)
        node2 = tree_1plus2mul3(parent=root)
        root = Node.objects.get(id=root.id)

        context = Context(logging=True)
        result = root.interpret(context)
        self.failUnlessEqual(context.logger.log.node, root)
        self.failUnlessEqual(context.logger.log.get_children().count(), 2)
        self.failUnlessEqual(context.logger.log.get_children()[0].node, node1)
        self.failUnlessEqual(context.logger.log.get_children()[1].node, node2)


class ProgramTest(ProgramTestBase):
    def test_empty_execution(self):
        result = self.program_version.interpret(test_model=self.test_model)
        self.assertIsNone(result.execution)

    def test_execution(self):
        now = timezone.now()
        context = Context(debug=True, logging=True)
        result = self.program_version.interpret(context=context, test_model=self.test_model)
        self.assertIs(result, context)
        execution = Execution.objects.get(id=result.execution.id)
        self.assertIsInstance(execution, Execution)
        self.assertEqual(self.program_version, execution.program_version)
        self.assertEqual(1, execution.arguments.all().count())
        self.assertTrue((execution.start_time - now).total_seconds() > 0)
        self.assertTrue((execution.finish_time - execution.start_time).total_seconds() > 0)
        execution_argument = execution.arguments.all().first()
        self.assertEqual(execution_argument.content_object, self.test_model)
        self.assertIsInstance(execution.log, LogEntry)


    def test_execution_empty_log(self):
        context = Context(debug=True, logging=False)
        result = self.program_version.interpret(context=context, test_model=self.test_model)
        self.assertIsNone(result.execution.log)
