Library Development
-------------------

.. _backend_development_environment:

Backend development environment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

nox
^^^^^^^^^^

Install `nox <https://nox.thea.codes/en/stable/>`_.

This tool will help you to setup dev environment and run tests.

Following command will create a virtual environment and install all dependencies:

.. code:: bash

    nox -s dev

Do not forget to activate the virtual environment before run any further commands.

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

    nox -s unittest
