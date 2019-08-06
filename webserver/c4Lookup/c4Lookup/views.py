
import requests
from django import http
from django.http import HttpResponse
from django.template import loader
from django.conf import settings
from django.contrib.auth import authenticate
from django.utils.safestring import mark_safe
from django.template import engines
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import (HTTP_200_OK, HTTP_400_BAD_REQUEST,
                                   HTTP_404_NOT_FOUND)


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key},
                    status=HTTP_200_OK)

catchall = TemplateView.as_view(template_name='index.html')

# def catchall(request):
#    template = loader.get_template('index.html')
#    context = {
#       'displayDebugBanner' : 'none',
#       'debugBannerNotice': '<b>DEBUG MODE NOT ACTIVE</b>',
#    }
#    if settings.DEBUG:
#       context['displayDebugBanner'] = 'inline-block'
#       context['debugBannerNotice'] = "<b>DEBUG MODE ACTIVE</b> Commit Version is <em>{}</em>".format(
#          settings.COMMIT_VERSION)
#    else:
#       context['debugBannerNotice'] += "DEBUG IS NOT ACTIVE"
#    context['debugBannerNotice'] = mark_safe(context['debugBannerNotice'])
#    return HttpResponse(template.render(context, request))
