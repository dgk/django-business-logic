Library Development
-------------------

.. _backend_development_environment:

Backend development environment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

virtualenv
^^^^^^^^^^

Virtualenv is probably what you want to use during development. Once you
have virtualenv installed, just fire up a shell and create your own
environment.

.. code:: bash

    virtualenv venv
    source venv/bin/activate
    pip install -r requirements.dev.txt

Installing test data
^^^^^^^^^^^^^^^^^^^^

.. code:: bash

    python manage.py migrate
    python manage.py loaddata sites/dev/fixtures/data.json

Running backend dev server
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code:: bash

    python manage.py runserver

An instance of django dev server will be listening on
http://localhost:8000/ . Now you can login into django admin interface
http://localhost:8000/admin/ with username ``test`` and password
``test``.

Frontend development environment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Fronted source files
located under the ``frontend`` folder.

.. code:: bash

    cd frontend

Installing dependencies
^^^^^^^^^^^^^^^^^^^^^^^

.. code:: bash

    npm install

Running webpack dev server
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code:: bash

    npm run server:dev:hmr

Now webpack dev server will be listening on http://localhost:3000/ .

Building frontend files
^^^^^^^^^^^^^^^^^^^^^^^

.. code:: bash

    npm run build:prod

Running tests
~~~~~~~~~~~~~

Running backend tests
^^^^^^^^^^^^^^^^^^^^^

.. code:: bash

    python manage.py test

Test it all
^^^^^^^^^^^

You need to know at least one command; the one that runs all the tests:

.. code:: bash

    tox
