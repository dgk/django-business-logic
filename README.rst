django-business-logic
=====================

django business logic programming made easy

Install
-------

There are a few different ways you can install django-business-logic:

-  Use pip: ``pip install -U django-business-logic``
-  Download the zipfile from the
   `releases <https://github.com/dgk/django-business-logic/releases>`__
   page and install it.
-  Checkout the source:
   ``git clone git://github.com/dgk/django-business-logic.git`` and
   install it yourself.

Getting Started
---------------

1. Edit ``settings.py`` and add ``business_logic`` to your
   ``INSTALLED_APPS``

   ::

       # settings.py
       INSTALLED_APPS = (
         ...
         'business_logic',
         'rest_framework', # optional, for browsable API only
         ...
       )

2. Edit ``urls.py`` and include ``business_logic.urls``

   ::

       # urls.py
       urlpatterns = (
         ...
         url('^business-logic', include('business_logic.urls')),
         ...
       )


