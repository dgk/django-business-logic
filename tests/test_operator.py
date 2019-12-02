# -*- coding: utf-8 -*-
#

from .common import *


class BinaryOperatorTest(TestCase):

    def test_init(self):
        add_operator = BinaryOperator(operator='+')
        self.assertEqual('+', add_operator.operator)

    def test_raise_on_incorrect_operator(self):
        self.assertRaises(TypeError, BinaryOperator, **dict(operator='z'))
        operator = BinaryOperator(operator='+')
        operator.operator = 'z'
        self.assertRaises(TypeError, operator.save)

    def test_str(self):
        add_operator = BinaryOperator(operator='+')
        self.assertEqual('+', str(add_operator))

    def test_interpret_mod(self):
        mod_operator = BinaryOperator(operator='%')
        number_const1 = NumberConstant(value=11)
        number_const2 = NumberConstant(value=3)
        ctx = Context()
        result = mod_operator.interpret(ctx, number_const1.interpret(ctx), number_const2.interpret(ctx))
        self.assertEqual(11 % 3, result)

        string_const1 = StringConstant(value='x%s')
        result = mod_operator.interpret(ctx, string_const1.interpret(ctx), number_const2.interpret(ctx))
        self.assertEqual('x3', result)

    def test_interpret_add(self):
        add_operator = BinaryOperator(operator='+')
        number_const1 = NumberConstant(value=5)
        number_const2 = NumberConstant(value=6)
        ctx = Context()
        result = add_operator.interpret(ctx, number_const1.interpret(ctx), number_const2.interpret(ctx))
        self.assertEqual(5 + 6, result)

        number_constant1 = NumberConstant(value=1.2)
        number_constant2 = NumberConstant(value=2.3)
        ctx = Context()
        result = add_operator.interpret(ctx, number_constant1.interpret(ctx), number_constant2.interpret(ctx))
        self.assertEqual(1.2 + 2.3, result)

    def test_interpret_sub(self):
        sub_operator = BinaryOperator(operator='-')
        number_const1 = NumberConstant(value=5)
        number_const2 = NumberConstant(value=6)
        ctx = Context()
        result = sub_operator.interpret(ctx, number_const1.interpret(ctx), number_const2.interpret(ctx))
        self.assertEqual(5 - 6, result)

        number_constant1 = NumberConstant(value=1.2)
        number_constant2 = NumberConstant(value=2.3)
        ctx = Context()
        result = sub_operator.interpret(ctx, number_constant1.interpret(ctx), number_constant2.interpret(ctx))
        self.assertEqual(1.2 - 2.3, result)

    def test_interpret_mul(self):
        mul_operator = BinaryOperator(operator='*')
        number_const1 = NumberConstant(value=2)
        number_const2 = NumberConstant(value=3)
        ctx = Context()
        result = mul_operator.interpret(ctx, number_const1.interpret(ctx), number_const2.interpret(ctx))
        self.assertEqual(2 * 3, result)

        number_constant1 = NumberConstant(value=1.2)
        number_constant2 = NumberConstant(value=2.3)
        ctx = Context()
        result = mul_operator.interpret(ctx, number_constant1.interpret(ctx), number_constant2.interpret(ctx))
        self.assertEqual(1.2 * 2.3, result)

    def test_interpret_div(self):
        div_operator = BinaryOperator(operator='/')
        number_const1 = NumberConstant(value=2)
        number_const2 = NumberConstant(value=3)
        ctx = Context()
        result = div_operator.interpret(ctx, number_const1.interpret(ctx), number_const2.interpret(ctx))
        self.assertEqual(2 // 3, result)

        number_constant1 = NumberConstant(value=1.2)
        number_constant2 = NumberConstant(value=2.3)
        ctx = Context()
        result = div_operator.interpret(ctx, number_constant1.interpret(ctx), number_constant2.interpret(ctx))
        self.assertEqual(1.2 // 2.3, result)

    def test_interpret_pow(self):
        pow_operator = BinaryOperator(operator='^')
        number_const1 = NumberConstant(value=2)
        number_const2 = NumberConstant(value=3)
        ctx = Context()
        result = pow_operator.interpret(ctx, number_const1.interpret(ctx), number_const2.interpret(ctx))
        self.assertEqual(2**3, result)

        number_constant1 = NumberConstant(value=1.2)
        number_constant2 = NumberConstant(value=2.3)
        ctx = Context()
        result = pow_operator.interpret(ctx, number_constant1.interpret(ctx), number_constant2.interpret(ctx))
        self.assertEqual(1.2**2.3, result)


class UnaryOperatorTest(TestCase):

    def test_init(self):
        neg_operator = UnaryOperator(operator='-')
        self.assertEqual('-', neg_operator.operator)

    def test_str(self):
        neg_operator = UnaryOperator(operator='-')
        self.assertEqual('-', str(neg_operator))

    def test_interpret_neg(self):
        neg_operator = UnaryOperator(operator='-')
        number_const1 = NumberConstant(value=3)
        ctx = Context()
        result = neg_operator.interpret(ctx, number_const1.interpret(ctx))
        self.assertEqual(-3, result)


class BinaryOperatorDecimalOperandTest(ProgramTestBase):

    def create_entry_point(self):
        # result = test_model.decimal_value / 2.0

        root = Node.add_root()
        self.result_variable_definition = VariableDefinition.objects.create(name='result')

        assignment_node = root.add_child(content_object=Assignment())

        variable = Variable.objects.create(definition=self.result_variable_definition)
        variable_node = assignment_node.add_child(content_object=variable)
        assignment_node = Node.objects.get(id=assignment_node.id)

        div_node = assignment_node.add_child(content_object=BinaryOperator(operator='/'))
        div_node.add_child(
            content_object=Variable.objects.create(definition=self.fields['decimal_value'].variable_definition))
        div_node = Node.objects.get(id=div_node.id)

        div_node.add_child(content_object=NumberConstant.objects.create(value=2.0))

        root = Node.objects.get(id=root.id)
        return root

    def test_interpret_div(self):
        context = Context()
        self.program_version.execute(test_model=self.test_model, context=context)
        self.assertEqual(self.test_model.decimal_value / Decimal(2.0),
                         context.get_variable(self.result_variable_definition))
