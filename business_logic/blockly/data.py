# -*- coding: utf-8 -*-

OPERATOR_TABLE = {
    'math_arithmetic': {
        '+': 'ADD',
        '-': 'MINUS',
        '*': 'MULTIPLY',
        '/': 'DIVIDE',
        '^': 'POWER',
    },
    'logic_compare': {
        '==': 'EQ',
        '!=': 'NEQ',
        '<': 'LT',
        '<=': 'LTE',
        '>': 'GT',
        '>=': 'GTE',
    },
    'logic_operation': {
        '&': 'AND',
        '|': 'OR',
    },
}

REVERSE_OPERATOR_TABLE = {
    block_type: {blockly: internal
                 for internal, blockly in operators.items()}
    for block_type, operators in OPERATOR_TABLE.items()
}
