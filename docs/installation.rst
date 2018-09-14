Installation
============

Library installation
--------------------

There are a few different ways you can install django-business-logic:

-  Use pip: ``pip install -U django-business-logic``
-  Download a zipfile from the
   `releases page <https://github.com/dgk/django-business-logic/releases>`__ and install it.
-  Checkout the source:
   ``git clone git://github.com/dgk/django-business-logic.git`` and
   install it yourself by entering ``python setup.py install``.

Server setup
------------

Edit ``settings.py`` and add following apps to your ``INSTALLED_APPS``

.. code:: python

    # settings.py
    INSTALLED_APPS = (
        # ...
        'django.contrib.contenttypes',

        'ace_overlay', # optional, for comfortable python functions editing
        'adminsortable2',
        'nested_inline',
        'polymorphic',
        'rest_framework', # optional, provided browsable API for this library handy development
        'django_filters', # ^^ same

        'business_logic',
        # ...
    )


Edit ``urls.py`` and include ``business_logic.urls``

.. code:: python

    # urls.py
    urlpatterns = (
      # ...
      url('^business-logic/', include('business_logic.urls')),
      # ...
    )

Make migrations

.. code:: bash

   python manage.py migrate

Collect static files

.. code:: bash

   python manage.py collectstatic
