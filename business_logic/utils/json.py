# -*- coding: utf-8 -*-
#

try:
    import cjson as json
    def _encode(obj):
        return cjson.encode(obj)
    def _decode(obj):
        return cjson.decode(obj)

except ImportError:
    import simplejson
    def _encode(obj):
        return simplejson.encoder.encode(obj)
    def _decode(obj):
        return simplejson.decoder.decode(obj)


def encode(obj):
    return _encode(obj)

def decode(obj):
    return _decode(obj)
