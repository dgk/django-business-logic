# -*- coding: utf-8 -*-
#


class ExceptionHandlingPolicy:
    IGNORE = 'IGNORE'
    INTERRUPT = 'INTERRUPT'
    RAISE = 'RAISE'


class ContextConfig(object):
    defaults = dict(
        log=False,
        debug=False,
        cache=True,
        exception_handling_policy=ExceptionHandlingPolicy.INTERRUPT,
    )

    def __init__(self, **kwargs):
        for k in kwargs.keys():
            if k not in self.defaults:
                raise TypeError('Incorrect kwarg {}'.format(k))

        for k, v in self.defaults.items():
            kwargs.setdefault(k, v)

        for k, v in kwargs.items():
            setattr(self, k, v)
