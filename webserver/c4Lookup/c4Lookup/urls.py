"""c4Lookup URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from django.conf.urls import url
from rest_framework.authtoken.views import obtain_auth_token

from .views import login, catchall

from c4Backend.views import handler404, handler500
from c4Backend.models import FrontendParams
from .getCommitInformation import getBranchLabel, getCommitHash, getCommitMessage

def trigger_error(request):
    division_by_zero = 1 / 0

urlpatterns = [
    path('dashboard/', admin.site.urls),
    path(r'api/v1/', include('c4Backend.urls')),
   #  re_path(r'^(?P<path>.*)/$', catchall),
    path('', catchall),
   #  re_path(r'', catchall),
   #  path('api/login', login),
   #  url(r'^api-token-auth/', obtain_auth_token),
   #  path('sentry-debug/', trigger_error),
]

handler404 = handler404
handler500 = handler500


FRONTEND_SETTINGS = FrontendParams.objects.all()
if (FRONTEND_SETTINGS.count() > 0):
   FRONTEND_SETTINGS = FRONTEND_SETTINGS[:1].get()
else:
   FRONTEND_SETTINGS = FrontendParams()

FRONTEND_SETTINGS.commitMessage = getCommitMessage()
FRONTEND_SETTINGS.commitBranch = getBranchLabel()
FRONTEND_SETTINGS.commitHash = getCommitHash()
FRONTEND_SETTINGS.save()
