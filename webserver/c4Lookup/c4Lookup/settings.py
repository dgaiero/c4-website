"""
Django settings for c4Lookup project.

Generated by 'django-admin startproject' using Django 2.2.1.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os
import environ
import subprocess

import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
import logging.config
from django.utils.log import DEFAULT_LOGGING


root_path = environ.Path(__file__) - 3
env = environ.Env()

# ENV = env('DJANGO_ENV')
SITE_ROOT = root_path()
environ.Env.read_env(env_file=os.path.join(SITE_ROOT))

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKEND_DIR = BASE_DIR
FRONTEND_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "c4frontend")

LOGGING_CONFIG = None
LOGLEVEL = env('LOGLEVEL', default='INFO').upper()

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')
# SECRET_KEY = '8lu*6g0lg)9z!ba+a$ehk)xt)x%rxgb$i1&amp;022shmi1jcgihb*'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool('DEBUG', default=False)
# DEBUG = False

ALLOWED_HOSTS = ['127.0.0.1', 'localhost', 'dgaiero.pythonanywhere.com']

REST_SAFE_LIST_IPS = [
    '127.0.0.1',
    'localhost',
    'dgaiero.pythonanywhere.com',
]

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'import_export',
    'django_filters',
    'crispy_forms',
    'rest_framework',
    'rest_framework.authtoken',
    'rest_auth',
    'rest_framework_latex',
    'corsheaders',
    'whitenoise.runserver_nostatic',

    'c4Backend',
]

REST_FRAMEWORK = {
   'DEFAULT_PERMISSION_CLASSES': [
      #  'c4Lookup.SafelistPermission.IsAdminOrReadOnly',
      # 'rest_framework.permissions.IsAuthenticatedOrReadOnly',
      'rest_framework.permissions.AllowAny',
   ],
   'DEFAULT_AUTHENTICATION_CLASSES': [
      'rest_framework.authentication.TokenAuthentication',
   ],
   # 'DEFAULT_RENDERER_CLASSES': [
   #    'rest_framework.renderers.JSONRenderer',
   # ],
   'DEFAULT_FILTER_BACKENDS': [
      'django_filters.rest_framework.DjangoFilterBackend',
   ],
}

IMPORT_EXPORT_USE_TRANSACTIONS = True

MIDDLEWARE = [
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
   #  'c4Lookup.customMiddleware.TimeDelayMiddleware',
]

REQUEST_TIME_DELAY = 3

CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
    'http://127.0.0.1:8000',
)

ROOT_URLCONF = 'c4Lookup.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(FRONTEND_DIR, 'build'),
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

WSGI_APPLICATION = 'c4Lookup.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }

# print(secrets.SCHEMA_NAME)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
      #   'OPTIONS': {
      #       'sql_mode': 'traditional',
      #   },
        'NAME': env('C4_DEV_DATABASE_NAME'),
        'USER': env('C4_DEV_DATABASE_USER'),
        'PASSWORD': env('C4_DEV_DATABASE_PSWD'),
        # Or an IP Address that your DB is hosted on
        'HOST': env('C4_DEV_DATABASE_HOST'),
        'PORT': '3306',
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Los_Angeles'

USE_I18N = True

USE_L10N = True

USE_TZ = True

sentry_sdk.init(
    dsn=env('SENTRY_DSN'),
    integrations=[DjangoIntegration()]
)


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATICFILES_DIRS = [os.path.join(FRONTEND_DIR, 'build', 'static')]
STATICFILES_STORAGE = (
    'whitenoise.storage.CompressedManifestStaticFilesStorage')

STATIC_ROOT = os.path.join(BACKEND_DIR, 'static')

STATIC_URL = '/static/'

WHITENOISE_ROOT = os.path.join(FRONTEND_DIR, 'build', 'root')


def getCommitVersion():
   branchLabel = subprocess.check_output(
       ["git", "branch"]).decode("utf8").strip()
   branchLabel = next(line for line in branchLabel.split("\n") if line.startswith("*"))
   branchLabel = branchLabel.strip("*").strip()
   commitHash = subprocess.check_output(
       ["git", "log", "--pretty=format:'%H'", "-n1"]).decode("utf8").strip().strip("'")
   commitMessage = subprocess.check_output(
       ["git", "log", "--pretty=format:'%B'", "-n1"]).decode("utf8").strip().strip("'")
   return "{}:{} ({})".format(branchLabel, commitHash, commitMessage)
   
COMMIT_VERSION = getCommitVersion()
