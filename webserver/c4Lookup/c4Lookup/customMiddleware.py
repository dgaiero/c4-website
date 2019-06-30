import time
from django.conf import settings

class TimeDelayMiddleware(object):

    def __init__(self, get_response):
        self.get_response = get_response
        self.delay = settings.REQUEST_TIME_DELAY

    def __call__(self, request):

      if '/api/v1/orgs' in request.path:
         time.sleep(self.delay + 1)
      if '/api/v1/keywords' in request.path:
         time.sleep(self.delay + 2)
      elif '/api/' in request.path:
         time.sleep(self.delay)
      response = self.get_response(request)
      return response
