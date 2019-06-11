Demo application
================

Description
-----------
Demo application is a simple bookshelf with the following models:

.. automodule:: sites.dev.books.models
    :members:

On each entering to single book view the following python code executed:

.. code:: python

    # sites/dev/books/views.py
    class BookDetail(generic.DetailView):
        model = Book

        def get_object(self, queryset=None):
            book = super(BookDetail, self).get_object(queryset)
            program = Program.objects.get(code='on_book_view')
            version = program.versions.order_by('id').last()
            version.execute(context=Context(debug=True, log=True), book=book)
            book.publisher.save()

            return book

You can see screenshots now: :ref:`demo_on_book_view_screenshot` and :ref:`demo_on_book_view_log_screenshot`

Hosted demo
-----------
Hosted demo site is available here: https://django-business-logic-demo.dev.dgk.su/ . The database is reset every hour.
You can login into django admin interface with username ``test`` and password ``test``.


Running using Docker
--------------------

You can run demo app locally using docker:

.. code:: bash

    docker build . -t django-business-logic-demo
    docker run --rm -it -p 8000:8000 django-business-logic-demo

or using docker-compose:

.. code:: bash

    docker-compose up

Also you can use prebuilt image:

.. code:: bash

    docker run --rm -it -p 8000:8000 dgksu/django-business-logic:demo

Now you can login into django admin interface
http://localhost:8000/admin/ with username ``test`` and password
``test``.


Deployment to Heroku
--------------------

You can deploy demo app directly to Heroku to see the app live. Just
click the button below. This will walk you through getting this app up
and running on Heroku in minutes.


.. image:: https://www.herokucdn.com/deploy/button.svg
    :target: https://heroku.com/deploy?template=https://github.com/dgk/django-business-logic


Running using local files
-------------------------

See :ref:`backend_development_environment`
