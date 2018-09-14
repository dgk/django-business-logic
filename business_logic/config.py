# -*- coding: utf-8 -*-
#


class ExceptionHandlingPolicy:
    """
    Enumeration of names of exception handling policies
    """
    IGNORE = 'IGNORE'
    """Ignore exception and continue execution"""

    INTERRUPT = 'INTERRUPT'
    """Interrupt execution, this is default behaviour"""

    RAISE = 'RAISE'
    """Re-raise exception"""


class ContextConfig(object):
    """
    Stores configuration of :class:`business_logic.models.Context`

    Args:
        kwargs(object): overrides default configuration values
    Raises:
        TypeError
    """

    defaults = dict(
        log=False,
        debug=False,
        cache=True,
        exception_handling_policy=ExceptionHandlingPolicy.INTERRUPT,
    )
    """object: default configuration values"""

    def __init__(self, **kwargs):
        for k in kwargs.keys():
            if k not in self.defaults:
                raise TypeError('Incorrect kwarg {}'.format(k))

        for k, v in self.defaults.items():
            kwargs.setdefault(k, v)

        for k, v in kwargs.items():
            setattr(self, k, v)
