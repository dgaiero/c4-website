from django.urls import path, include, re_path
from django.conf.urls import url

from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'orgs', views.OrganizationViewSet)
router.register(r'keywords', views.KeywordViewSet)
# router.register(r'keywordLists', views.KeywordList)
router.register(r'collaborations', views.CollaborationViewSet)


urlpatterns = [url(r'^', include(router.urls)),
               path('rest-auth/', include('rest_auth.urls')),
               ]

# urlpatterns = [
   # path('orgs/', views.ListOrganization.as_view()),
   # path('orgs/<int:pk>/', views.DetailOrganization.as_view()),
   # path('users/', views.ListUser.as_view()),
   # path('users/<int:pk>/', views.DetailUser.as_view()),
# ]
