import os
import sys

import django

SITE_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.join(SITE_DIR, os.pardir)

SECRET_KEY = 'ygw^xlknx$7$2-jbpzmaw!d%qe0uw+ozm&q@)7t82m0v(q(&)('

DEBUG = True

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    #
    'rest_framework',
    'nested_inline',
    'polymorphic',
    'ace_overlay',
    'adminsortable2',
    #
    'business_logic',
]

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
)

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(SITE_DIR, 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Internationalization
# https://docs.djangoproject.com/en/1.8/topics/i18n/

LANGUAGE_CODE = 'en-us'

locale_dir = os.path.join(BASE_DIR, 'business_logic/locale')
LANGUAGES = ((x, x) for x in os.listdir(locale_dir) if os.path.isdir(os.path.join(locale_dir, x)))

TIME_ZONE = 'UTC'

# USE_I18N = True

# USE_L10N = True

USE_TZ = True


# http://stackoverflow.com/a/28560805/138063
class DisableMigrations(object):

    def __contains__(self, item):
        return True

    def __getitem__(self, item):
        if django.VERSION[1] < 9:
            # django < 1.9
            return "notmigrations"
        return None
