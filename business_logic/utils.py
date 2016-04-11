# -*- coding: utf-8 -*-


def pairs(iterable):
    # split iterable into two element chunks
    return [iterable[i:i + 2] for i in range(0, len(iterable), 2)]
