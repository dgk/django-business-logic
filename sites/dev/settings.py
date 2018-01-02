from ..settings import *

DEBUG = True
ALLOWED_HOSTS = ['*']

INSTALLED_APPS += [
    #    'django_extensions',
    'bootstrap3',
    'sites.dev.books',
]

ROOT_URLCONF = 'sites.dev.urls'
WSGI_APPLICATION = 'sites.dev.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(os.path.dirname(__file__), 'db.sqlite3'),
    }
}

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

if 'test' in sys.argv[1:] or 'jenkins' in sys.argv[1:]:
    from ..test.settings import *
