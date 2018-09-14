# -*- coding: utf-8 -*-


class InterpretationException(Exception):
    """
    Wraps python exception raised during running :func:`business_logic.models.Node.interpret`.
    """
    pass


class StopInterpretationException(Exception):
    """
    Exception for stop interpretation. This feature not implemented.

    See Also:
        * :class:`business_logic.models.StopInterpretation`
    """
    pass


class BreakLoopException(Exception):
    """
    Exception for breaking loops. This feature not implemented.

    See Also:
        * :class:`business_logic.models.BreakLoop`
    """
    pass
