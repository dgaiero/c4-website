from rest_framework import serializers
from .models import Organization, User, Keyword, Collaborations

class OrganizationSerializer(serializers.ModelSerializer):
   class Meta:
      model = Organization
      fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
   class Meta:
      model = User
      fields = '__all__'


class KeywordSerializer(serializers.ModelSerializer):
   class Meta:
      model = Keyword
      fields = '__all__'


class CollaborationSerializer(serializers.ModelSerializer):
   class Meta:
      model = Collaborations
      fields = '__all__'
