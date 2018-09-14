Configuration
=============

.. _administrative_setup:

Administrative setup
--------------------

First you should define one or more ProgramInterface objects via django
admin interface
(http://localhost:8000/admin/business_logic/programinterface/).

Each ProgramInterface must contain one or more ProgramArgument objects.
The ProgramArgument object represents one instance of django.db.Model
derived class specified as django.contrib.contentypes.ContentType
instance (e.g. for your custom Order model) and his keyword argumet name
(e.g. ``order``).

Each ProgramArgument object must contain one or more
ProgramArgumentField which represents one field of django model (e.g.
``sum`` for Order object or ``delivery_address.city`` for ``city`` field
nested into Order DeliveryAddress model).

If you want to use system-wide references (e.g. your custom City or
ProductCategory django model) and you define represented
ProgramArgumentField you should register referenced model via django
admin
interface(\ http://localhost:8000/admin/business_logic/referencedescriptor/).

Next create one or more Program objects which must implements described
ProgramInterface(e.g. named "On Order create" with "on\_order\_create"
``code`` field for programmatic access)

.. _invocation_injecting:

Invocation injecting
--------------------

You may inject execution engine call at arbitrary place of your code,
such as custom ``form.save()``, ``model.post_save()`` methods, any
``django.dispatch.Signal`` handler or so on. Just instantiate appropriate
``ProgramVersion`` object and pass kwargs described in the ``ProgramInterface``
admin page to its ``execute()`` method. E.g.:

.. code:: python


    from django.views.generic.edit import CreateView

    from business_logic.models import Program

    class OrderCreate(CreateView):
        def form_valid(self, form):
           order = form.save()
           program = Program.objects.get(code="on_order_create")
           program_version = program.versions.order_by("id").last()
           program_version.execute(order=order)

The :func:`business_logic.models.ProgramVersion.execute` method can accept instance of
:class:`business_logic.models.Context` object. If this parameter omitted ``execute()``
method creates new instance of :class:`business_logic.models.Context` with specified by :class:`business_logic.models.ExecutionEnvironment` parameters or with default parameters.

It can be initialized by the following parameters:

* ``log`` (boolean, default - ``False``) - create execution log
* ``debug`` (boolean, default - ``False``) - create special :class:`business_logic.models.Execution` object contained:

    * all variables passed to ``execute()`` method
    * :class:`business_logic.models.ProgramVersion` object
    * start and end execution times
    * root of log objects if its created

The ``ProgramVersion.execute()`` method returns the Context instance.

