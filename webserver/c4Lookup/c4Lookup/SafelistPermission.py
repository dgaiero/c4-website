from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework import permissions
from django.conf import settings
import sys

class SafelistPermission(permissions.BasePermission):
   """
   Ensure the request's IP address is on the safe list configured in Django settings.
   """

   def has_permission(self, request, view):

      remote_addr = request.META['REMOTE_ADDR']
      sys.stderr.write("ADDRESS="+remote_addr+"\n")

      for valid_ip in settings.REST_SAFE_LIST_IPS:
         if remote_addr == valid_ip or remote_addr.startswith(valid_ip):
            return True

      return False


class IsAdminOrReadOnly(BasePermission):
   def has_permission(self, request, view):
      if request.method in SAFE_METHODS:
         return True
      else:
         return request.user.is_staff

class NoAccess(BasePermission):
   def has_permission(self, request, view):
      return False
