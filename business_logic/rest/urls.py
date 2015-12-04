# -*- coding: utf-8 -*-
from django.conf.urls import url
from rest_framework import routers

from .views import api_root

router = routers.SimpleRouter()
#router.register(r'users', UserViewSet)
#router.register(r'accounts', AccountViewSet)
urlpatterns = router.urls
urlpatterns = [
    url('$', api_root, name='root')
]

