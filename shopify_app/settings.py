import os

#ROOT = os.path.dirname(__file__)

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)

import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '08il02y-z)9&f3f$c03%o8@@3$z0x^4i!_zm8*abt^1wc)!=*t'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = (
    'shopify_app',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'rest_auth',
)

MIDDLEWARE_CLASSES = (
    # 'djangular.middleware.DjangularUrlMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',

    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'shopify_app.urls'

WSGI_APPLICATION = 'shopify_app.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases



# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/
STATIC_PATH = os.path.join(BASE_DIR, 'public/static')
STATIC_URL = '/public/static/'
#STATIC_ROOT = ROOT + '/public/static'
STATIC_ROOT = os.path.join(PROJECT_ROOT, '../public/static')

#STATICFILES_DIRS = (
#   STATIC_PATH,
#)
STATICFILES_DIRS = (
    os.path.join(PROJECT_ROOT, '../public/static'),
)
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = 'accounts/login/'

# TEMPLATE_DIRS
TEMPLATE_DIRS = (
    os.path.join(PROJECT_ROOT, '../public/templates'),
)

# celery
BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379'
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'Europe/London'






