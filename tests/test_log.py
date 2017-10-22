# -*- coding: utf-8 -*-
#
from business_logic.models.log import LOG_ENTRY_VALUE_LENGTH

from .common import *


class LogTest(TestCase):
    def test_logger(self):
        context = Context(log=True)
        self.failUnless(context.logger)
        self.failUnless(context.logger.log is None)

    def test_log_tree(self):
        root = tree_1plus2mul3()

        context = Context(log=True)
        result = root.interpret(context)

        self.failUnless(context.logger.log)
        self.failUnless(isinstance(context.logger.log, LogEntry))
        self.failUnlessEqual(context.logger.log.node, root)

    def test_log_values(self):
        root = tree_1plus2mul3()

        context = Context(log=True)
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

        context = Context(log=True)
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

        context = Context(log=True)
        result = root.interpret(context)

        log = LogEntry.objects.get(id=context.logger.log.id)
        self.failUnless(log.get_children()[0].previous_value.endswith('aaa...'))

    def test_log_disabled(self):
        root = tree_1plus2mul3()

        context = Context(log=False)
        result = root.interpret(context)

        self.failUnless(context.logger.log is None)

    def test_log_block(self):
        root = Node.add_root()
        node1 = tree_1plus2mul3(parent=root)
        node2 = tree_1plus2mul3(parent=root)
        root = Node.objects.get(id=root.id)

        context = Context(log=True)
        result = root.interpret(context)
        self.failUnlessEqual(context.logger.log.node, root)
        self.failUnlessEqual(context.logger.log.get_children().count(), 2)
        self.failUnlessEqual(context.logger.log.get_children()[0].node, node1)
        self.failUnlessEqual(context.logger.log.get_children()[1].node, node2)

    def test_log_exception(self):
        root = symmetric_tree(operator='/', value=0, count=2)
        root = Node.objects.get(id=root.id)
        context = Context(log=True)
        result = root.interpret(context)
        log = LogEntry.objects.get(id=context.logger.log.id)

        exception_log = log.exception
        self.assertIsInstance(exception_log, ExceptionLog)

        try:
            0.0 // 0.0
        except Exception as e:
            exception = e

        self.assertEqual(exception.__class__.__name__, exception_log.type)
        self.assertEqual(exception.__class__.__module__, exception_log.module)
        self.assertEqual(str(exception), exception_log.message)
        self.assertIn('Traceback (most recent call last):', exception_log.traceback)
        self.assertIn('ZeroDivisionError: float divmod()', exception_log.traceback)


    def test_log_variable_undefined(self):
        # Logger().prepare_value(Variable.Undefined()) causes
        # TypeError: coercing to Unicode: need string or buffer, __proxy__ found

        Logger().prepare_value(Variable.Undefined())

        variable_definition = VariableDefinition.objects.create(name='A')
        root = variable_assign_value(variable_name='B', variable_definition=variable_definition)
        context = Context(log=True)
        result = root.interpret(context)
        self.assertFalse(ExceptionLog.objects.all())


class ProgramTest(ProgramTestBase):
    def test_empty_execution(self):
        result = self.program_version.execute(test_model=self.test_model)
        self.assertIsNone(result.execution)

    def test_execution(self):
        now = timezone.now()
        context = Context(debug=True, log=True)
        result = self.program_version.execute(context=context, test_model=self.test_model)
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
        context = Context(debug=True, log=False)
        result = self.program_version.execute(context=context, test_model=self.test_model)
        self.assertIsNone(result.execution.log)
