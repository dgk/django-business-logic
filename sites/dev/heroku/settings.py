import dj_database_url
from ..settings import *

DATABASES = {'default': dj_database_url.config()}
ALLOWED_HOSTS = ['*']
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

STATIC_ROOT = os.path.join(PROJECT_ROOT, 'staticfiles')
STATIC_URL = '/static/'

MIDDLEWARE += (
    'whitenoise.middleware.WhiteNoiseMiddleware',
)
