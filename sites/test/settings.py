import os

from ..settings import *

ROOT_URLCONF = 'sites.test.urls'

INSTALLED_APPS += [
    #'django_nose',
    'tests.test_app'
]
#TEST_RUNNER = 'django_nose.NoseTestSuiteRunner'
#TEST_OUTPUT_DIR = os.path.join(BASE_DIR, 'tests', 'reports')
#NOSE_ARGS = [
#        '--verbosity=1',
#        '--nologcapture',
#        '--with-coverage',
#        '--cover-package=business_logic',
        #'--with-spec',
        #'--spec-color',
        #'--with-xunit',
        #'--xunit-file={}/unittests.xml'.format(TEST_OUTPUT_DIR),
        #'--cover-xml',
        #'--cover-xml-file={}/coverage.xml'.format(TEST_OUTPUT_DIR),
#    ]


DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': ':memory:',
        },
}

STATIC_URL = '/admin-static/'

#PASSWORD_HASHERS = (
#    'django.contrib.auth.hashers.MD5PasswordHasher',
#)
#DEBUG = False
#TEMPLATE_DEBUG = False
#MIGRATION_MODULES = DisableMigrations()
#INSTALLED_APPS += (
#    'tests.test_app',
#)
