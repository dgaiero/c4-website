from django.db import models
from django.utils.timezone import now


class Organization(models.Model):
   INSTITUTION_TYPE = "IO"
   CITY_TYPE = "CY"
   COUNTY_TYPE = "CO"
   NGO_TYPE = "NG"
   REGIONAL_TYPE = "RA"
   ORG_TYPES = (
      (INSTITUTION_TYPE, "Institution"),
      (CITY_TYPE, "City"),
      (COUNTY_TYPE, "County"),
      (NGO_TYPE, "NGO"),
      (REGIONAL_TYPE, "Regional Agency"),
   )
   orgName = models.CharField(
      max_length=100,
      verbose_name="Organization Name",
      # unique=True
   )
   orgType = models.CharField(
      max_length=2,
      choices=ORG_TYPES,
      default=2,
      verbose_name="Organization Type"
   )
   website = models.URLField(
      verbose_name="Website",
      blank=True,
      null=True
   )
   department = models.CharField(
       max_length=100,
       verbose_name="Department Name",
       blank=True,
       null=True
   )
   dateAdded = models.DateTimeField(auto_now_add=True, null=True)

   orgNameUnique = models.CharField(
      max_length=100,
      editable=False,
   )

   def save(self, *args, **kwargs):
      self.orgNameUnique = self.orgName
      if self.department is not None:
         self.orgNameUnique += ": {}".format(self.department)
      super().save(*args, **kwargs)  # Call the "real" save() method.

   def __str__(self):
      orgFullName = self.orgName
      if self.department is not None:
         orgFullName += ": {}".format(self.department)
      return orgFullName

   class Meta:
      unique_together = (("orgName", "department"),)

class User(models.Model):
   UNIVERSITY_STAFF = "US"
   CITY_STAFF = "CS"
   COUNTY_STAFF = "CO"
   NGO_STAFF = "NS"
   REGIONAL_STAFF = "RS"
   USER_TYPES = (
      (UNIVERSITY_STAFF, "University Faculty/Staff"),
      (CITY_STAFF, "City Staff"),
      (COUNTY_STAFF, "County Staff"),
      (NGO_STAFF, "NGO Staff"),
      (REGIONAL_STAFF, "Regional Staff"),
   )
   userType = models.CharField(
      max_length=2,
      choices=USER_TYPES,
      verbose_name="User Type"
   )
   firstName = models.CharField(
      max_length=100,
      verbose_name="First Name"
   )
   lastName = models.CharField(
      max_length=100,
      verbose_name="Last Name"
   )
   jobTitle = models.CharField(
      max_length=100,
      verbose_name="Job Title",
      blank=True,
      null=True
   )

   emailAddress = models.EmailField(
      verbose_name="Email Address",
      unique=True)

   keywords = models.ManyToManyField(
      'Keyword',
      verbose_name="Keywords"
   )
   collaborations = models.ManyToManyField(
      'Collaborations',
      verbose_name='Collaborations',
      blank=True
   )
   website = models.URLField(
      verbose_name="Website",
      blank=True,
      null=True
   )
   organization = models.ManyToManyField(
      'Organization',
      # on_delete=models.CASCADE,
      verbose_name="Affiliated Organization"
   )
   description = models.TextField(
      verbose_name="Short Description",
      blank=True,
      null=True
      )
   dateAdded = models.DateTimeField(auto_now_add=True)

   def __str__(self):
      return f"{self.firstName} {self.lastName}"

class Collaborations(models.Model):
   collaborationName = models.CharField(
         max_length=100,
         verbose_name="Collaboration Name",
         unique=True
   )
   class Meta:
      verbose_name = 'Collaboration'
      verbose_name_plural = 'Collaborations'

   def __str__(self):
      return self.collaborationName

class Keyword(models.Model):
   TOPIC_KEYWORD = "TK"
   ACTIVITY_KEYWORD = "AK"
   KEYWORD_TYPES = (
      (TOPIC_KEYWORD, "Topical Keyword"),
      (ACTIVITY_KEYWORD, "Activity Keyword")
   )

   SORT_HIGH = "HS"
   SORT_MEDIUM = "MS"
   SORT_LOW = "LS"

   SORT_ORDER = (
      (SORT_HIGH, "High Level"),
      (SORT_MEDIUM, "Medium Level"),
      (SORT_LOW, "Low Level"),
   )

   keywordType = models.CharField(
      max_length=2,
      choices=KEYWORD_TYPES,
      verbose_name="Keyword Type"
   )
   sortOrder = models.CharField(
      max_length=2,
      choices=SORT_ORDER,
      verbose_name="Sort Order",
      help_text="How high level is this keyword? (Fruit would be high level, \
         Apple would be medium level, and Fuji Apple would be low level."
   )
   keywordName = models.CharField(
      max_length=100,
      verbose_name="Keyword Name",
      unique=True
      )
   keywordDescription = models.TextField(
      verbose_name="Description",
      help_text="A short, optional description of the keyword.",
      blank=True,
      null=True
      )
   dateAdded = models.DateTimeField(auto_now_add=True)

   def __str__(self):
      return self.keywordName
