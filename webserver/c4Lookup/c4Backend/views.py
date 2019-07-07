# from django.shortcuts import render

from rest_framework import generics, viewsets

from django_filters import rest_framework as filters
# from rest_framework import filters

from django.shortcuts import render_to_response

from .models import Organization, User, Keyword, Collaborations, FrontendParameters
from .serializers import OrganizationSerializer, UserSerializer, KeywordSerializer, CollaborationSerializer, FrontendParameterSerialier

from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

class OrganizationViewSet(viewsets.ModelViewSet):
   queryset = Organization.objects.all()
   serializer_class = OrganizationSerializer
   # permission_classes = (IsAuthenticated,)
   filterset_fields = ('orgName', 'orgType', 'department')

class UserViewSet(viewsets.ModelViewSet):
   queryset = User.objects.all()
   serializer_class = UserSerializer
   filterset_fields = ('userType', 'jobTitle', 'keywords', 'collaborations', 'organization')
   # permission_classes = (IsAuthenticated,)

class KeywordViewSet(viewsets.ModelViewSet):
   queryset = Keyword.objects.all()
   serializer_class = KeywordSerializer
   # permission_classes = (IsAuthenticated,)
   filterset_fields = ('keywordType', 'sortOrder')


class CollaborationViewSet(viewsets.ModelViewSet):
   queryset = Collaborations.objects.all()
   serializer_class = CollaborationSerializer
   # permission_classes = (IsAuthenticated,)

class FrontendViewSet(viewsets.ViewSet):
   def list(self, request):
      queryset = FrontendParameters.objects.all()
      serializer = FrontendParameterSerialier(queryset, many=True)
      return Response(serializer.data)

   def retrieve(self, request, pk=None):
      queryset = FrontendParameters.objects.all()
      parameter = get_object_or_404(queryset, pk=pk)
      serializer = FrontendParameterSerialier(parameter)
      return Response(serializer.data)
   


def handler404(request, exception, template_name="404.html"):
    response = render_to_response("c4Backend/404.html")
    response.status_code = 404
    return response


def handler500(request, template_name="500.html"):
    response = render_to_response("c4Backend/500.html")
    response.status_code = 500
    return response
