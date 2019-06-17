# from django.shortcuts import render

from rest_framework import generics, viewsets

from django.shortcuts import render_to_response

from .models import Organization, User, Keyword, Collaborations
from .serializers import OrganizationSerializer, UserSerializer, KeywordSerializer, CollaborationSerializer

from .permissions import IsAdminOrReadOnly
from rest_framework.permissions import IsAuthenticated

# class ListOrganization(generics.ListCreateAPIView):
#    queryset = Organization.objects.all()
#    serializer_class = OrganizationSerializer


# class DetailOrganization(generics.RetrieveUpdateDestroyAPIView):
#    queryset = Organization.objects.all()
#    serializer_class = OrganizationSerializer


# class ListUser(generics.ListCreateAPIView):
#    queryset = User.objects.all()
#    serializer_class = UserSerializer


# class DetailUser(generics.RetrieveUpdateDestroyAPIView):
#    queryset = Organization.objects.all()
#    serializer_class = UserSerializer

class OrganizationViewSet(viewsets.ModelViewSet):
   queryset = Organization.objects.all()
   serializer_class = OrganizationSerializer
   permission_classes = (IsAuthenticated,)

class UserViewSet(viewsets.ModelViewSet):
   queryset = User.objects.all()
   serializer_class = UserSerializer
   permission_classes = (IsAuthenticated,)

class KeywordViewSet(viewsets.ModelViewSet):
   queryset = Keyword.objects.all()
   serializer_class = KeywordSerializer
   permission_classes = (IsAuthenticated,)

class CollaborationViewSet(viewsets.ModelViewSet):
   queryset = Collaborations.objects.all()
   serializer_class = CollaborationSerializer
   permission_classes = (IsAuthenticated,)


def handler404(request, exception, template_name="404.html"):
    response = render_to_response("c4Backend/404.html")
    response.status_code = 404
    return response


def handler500(request, template_name="500.html"):
    response = render_to_response("c4Backend/500.html")
    response.status_code = 500
    return response
