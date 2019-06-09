from ..settings import *

SITE_DIR = os.path.dirname(os.path.abspath(__file__))

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
STATICFILES_FINDERS = [
    'sites.dev.utils.staticfiles.finders.AppDirectoriesIndexFinder',
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

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

if 'test' in sys.argv[1:] or 'jenkins' in sys.argv[1:]:
    from ..test.settings import *
