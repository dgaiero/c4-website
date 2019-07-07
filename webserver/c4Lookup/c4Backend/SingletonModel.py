# Written by Senko Rasic <senko.rasic@goodcode.io>
# Released into Public Domain. Use it as you like.

from django.db import models
from django.core.cache import cache


class SingletonModel(models.Model):
   """Singleton Django Model
   Ensures there's always only one entry in the database, and can fix the
   table (by deleting extra entries) even if added via another mechanism.
   Also has a static load() method which always returns the object - from
   the database if possible, or a new empty (default) instance if the
   database is still empty. If your instance has sane defaults (recommended),
   you can use it immediately without worrying if it was saved to the
   database or not.
   Useful for things like system-wide user-editable settings.
   """

   class Meta:
      abstract = True

   def delete(self, *args, **kwargs):
      pass

   def set_cache(self):
      cache.set(self.__class__.__name__, self)

   def save(self, *args, **kwargs):
      self.pk = 1
      super(SingletonModel, self).save(*args, **kwargs)
      self.set_cache()

   @classmethod
   def load(cls):
      if cache.get(cls.__name__) is None:
         obj, created = cls.objects.get_or_create(pk=1)
         if not created:
            obj.set_cache()
      return cache.get(cls.__name__)
