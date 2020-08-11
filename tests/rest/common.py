# -*- coding: utf-8 -*-

import json

import six

from ..common import *


class JSONClient(Client):

    def post(self, path, data={}, content_type='application/json', follow=False, **extra):
        ret = super(Client, self).post(
            path, data=data, content_type=content_type, follow=follow, HTTP_X_REQUESTED_WITH='XMLHttpRequest', **extra)
        return ret

    def put(self, path, data={}, content_type='application/json', follow=False, **extra):
        ret = super(Client, self).put(
            path, data=data, content_type=content_type, follow=follow, HTTP_X_REQUESTED_WITH='XMLHttpRequest', **extra)
        return ret

    def delete(self, path, data={}, content_type='application/json', follow=False, **extra):
        ret = super(Client, self).delete(
            path, data=data, content_type=content_type, follow=follow, HTTP_X_REQUESTED_WITH='XMLHttpRequest', **extra)
        return ret


def response_json(response):
    return json.loads(response.content.decode('utf-8'))


class ProgramRestTestBase(ProgramTestBase):

    def setUp(self):
        super(ProgramRestTestBase, self).setUp()
        self.client = JSONClient()
