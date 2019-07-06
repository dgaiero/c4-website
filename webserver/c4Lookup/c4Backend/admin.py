from django.contrib import admin
from import_export.admin import ImportExportModelAdmin, ImportExportMixin, ImportMixin

from .models import Organization, User, Keyword, Collaborations, FrontendParams
from .resources import OrganizationResource, UserResource, KeywordResource, CollaborationResource

@admin.register(Organization)
class OrganizationAdmin(ImportExportModelAdmin):
   resource_class = OrganizationResource
   date_hierarchy = 'dateAdded'
   fieldsets = [
      ('Org Information', {'fields' : ['orgName', 'orgType']}),
      ('Extended Information', {'fields' : ['department', 'website']}),
      ('Debug Information', {'fields': ['orgNameUnique', ]}),
   ]
   search_fields = ['orgName', 'orgType', 'department']
   list_display = ('orgName', 'department', 'orgType')
   list_filter = ('orgName', 'department', 'orgType')
   readonly_fields = ['orgNameUnique']


@admin.register(FrontendParams)
class FrontendParametersAdmin(admin.ModelAdmin):
   fieldsets = [
      ('Basic Site Information', {'fields': ['siteHeading']}),
      ('Front Page Information', {'fields': ['frontHeading', 'frontMessage', 'frontMessageSubText', 'additionEmailAddress']}),
      ('Commit Information', {'fields': ['commitBranch', 'commitHash', 'commitMessage']}),
   ]
   readonly_fields = ('commitBranch', 'commitHash', 'commitMessage')

@admin.register(User)
class UserAdmin(ImportExportModelAdmin):
   date_hierarchy = 'dateAdded'
   resource_class = UserResource
   fieldsets = [
       ('Basic Information', {'fields': ['firstName', 'lastName', 'emailAddress']}),
       ('Extended Information', {'fields': ['userType', 'website', 'description']}),
       ('Organization Information', {'fields': ['keywords', 'collaborations','organization', 'jobTitle']}),

   ]
   search_fields = ['firstName', 'lastName', 'emailAddress',
                    'userType', 'keywords__keywordName', 'collaborations__collaborationName', 'organization__orgName', 'jobTitle']
   list_display = ('firstName', 'lastName', 'userType')
   list_filter = ('userType', 'keywords', 'organization', 'jobTitle')
   filter_horizontal = ('keywords','collaborations', 'organization')


@admin.register(Keyword)
class KeywordAdmin(ImportExportModelAdmin):
   resource_class = KeywordResource
   date_hierarchy = 'dateAdded'
   fieldsets = [
       ('Keyword Information', {'fields': ['keywordType', 'keywordName', 'sortOrder']}),
       ('Extended Information', {'fields': ['keywordDescription']}),
   ]
   search_fields = ['keywordName']
   list_display = ('keywordName', 'keywordType', 'sortOrder')
   list_filter = ('keywordType', 'sortOrder')

@admin.register(Collaborations)
class CollaborationAdmin(ImportExportModelAdmin):
   resource_class = CollaborationResource
   fieldsets = [
      ('Collaboration Information', {'fields': ['collaborationName']})
   ]
   search_fields = ['collaborationName']
   list_display = ('collaborationName',)
   list_filter = ('collaborationName',)

# admin.site.register(Organization)
# admin.site.register(User, UserAdmin)
# admin.site.register(Keyword)

admin.site.site_header = 'Central Coast Climate Collaborative Database\
   Query Admin Site'
admin.site.site_title = 'Central Coast Climate Collaborative'
# Register your models here.
