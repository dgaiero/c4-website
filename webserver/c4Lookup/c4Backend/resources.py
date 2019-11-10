from import_export import resources
from django.db import IntegrityError
from import_export.widgets import ForeignKeyWidget, ManyToManyWidget
import import_export.fields as fields
from .models import Organization, User, Keyword, Collaborations



class CollaborationResource(resources.ModelResource):
   id = fields.Field(column_name='ID', attribute='id')
   collaborationName = fields.Field(
      attribute='collaborationName',
      column_name=('Collaboration Name')
   )
collaborationDescription = fields.Field(
       column_name='Collaboration Description', attribute='collaborationDescription')

class OrganizationResource(resources.ModelResource):

   id = fields.Field(column_name='ID',attribute='id')
   orgName = fields.Field(column_name='Organization Name', attribute='orgName')
   orgType = fields.Field(
      # attribute='get_orgType_display',
      attribute='orgType',
      column_name=('Organization Type')
   )
   website = fields.Field(column_name='Website', attribute='website')
   department = fields.Field(column_name='Department', attribute='department', default=None)

   class Meta:
      skip_unchanged = True
      report_skipped = False
      model = Organization
      exclude = ('id', 'dateAdded')
      import_id_fields = ('orgName', 'department')
      fields = ('id', 'orgName', 'orgType', 'website', 'department')
      export_order = ('id', 'orgName', 'orgType', 'website', 'department')

# class KeywordResource(resources.ModelResource):
#    id = fields.Field(column_name='ID', attribute='id')
#    keywordName = fields.Field(column_name='Keyword Name', attribute='keywordName')


class KeywordResource(resources.ModelResource):

   id = fields.Field(column_name='ID', attribute='id')
   keywordType = fields.Field(
       attribute='keywordType',
       column_name=('Keyword Type')
   )
   sortOrder = fields.Field(
       attribute='sortOrder',
       column_name=('Sort Order')
   )
   keywordName = fields.Field(column_name='Keyword Name', attribute='keywordName')
   keywordDescription = fields.Field(
       column_name='Keyword Description', attribute='keywordDescription')

   class Meta:
      skip_unchanged = True
      report_skipped = False
      model = Keyword
      exclude = ('id', 'dateAdded')
      import_id_fields = ('keywordName',)
      fields = ('id', 'keywordName', 'keywordType', 'sortOrder', 'keywordDescription')
      export_order = ('id', 'keywordName', 'keywordType', 'sortOrder', 'keywordDescription')

class UserResource(resources.ModelResource):

   def save_instance(self, instance, using_transactions=True, dry_run=False):
      name = self.__class__
      try:
         super(name, self).save_instance(instance, using_transactions, dry_run)
      except IntegrityError:
         pass

   # def import_obj(instance, row):
   #    super(UserResource, self).import_obj(instance, row)
   #    instance.name = "%s: %s" % (row['organization'])

   id = fields.Field(column_name='ID',attribute='id')

   firstName = fields.Field(column_name='First Name',attribute='firstName')

   lastName = fields.Field(column_name='Last Name',attribute='lastName')

   emailAddress = fields.Field(column_name='Email Address',attribute='emailAddress')

   website = fields.Field(column_name='Website',attribute='website')

   jobTitle = fields.Field(column_name='Job Title',attribute='jobTitle')

   organization = fields.Field(
      column_name='Organization',
      attribute='organization',
      widget=ManyToManyWidget(Organization, field='orgNameUnique')
      # widget=ForeignKeyWidget(Organization, 'orgName')
   )

   userType = fields.Field(
      # attribute='get_userType_display',
      attribute='userType',
      column_name='User Type'
   )

   # userType.save()
   # print(userType.get_value(userType))

   description = fields.Field(
       column_name='Description',
       attribute='description',
   )

   keywords = fields.Field(
       column_name='Keywords',
       attribute='keywords',
       widget=ManyToManyWidget(Keyword, field='keywordName'))

   collaborations = fields.Field(
      column_name='Collaborations',
      attribute='collaborations',
      widget=ManyToManyWidget(Collaborations, field='collaborationName')
   )


   class Meta:
      skip_unchanged = True
      report_skipped = True
      model = User
      # widgets = {
      #    'userType': {'choices': 'User.USER_TYPES'}
      # }
      exclude = ('id', 'dateAdded')
      import_id_fields = ('emailAddress',)
      fields = ('id', 'firstName', 'lastName', 'emailAddress', 'website', 'jobTitle', 'organization', 'userType', 'description', 'keywords', 'collaborations')
      export_order = ('firstName', 'lastName', 'emailAddress', 'website', 'jobTitle',
                      'organization', 'userType', 'description', 'keywords', 'collaborations')

