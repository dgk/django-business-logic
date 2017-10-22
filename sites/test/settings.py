import os

from ..settings import *

ROOT_URLCONF = 'sites.test.urls'

INSTALLED_APPS += [
    'tests.test_app'
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': ':memory:',
    },
}

STATIC_URL = '/admin-static/'
