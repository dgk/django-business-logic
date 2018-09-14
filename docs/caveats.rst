Caveats
=======


.. warning::
   Please note that this software is still Alpha/Beta quality and is not recommended for production use.
   The library is currently in active development and any API may be changed. Migration history for models is not supported now.
   Some internal objects are world writable!

.. note::
    If you want to use this library before it have implemented
    authenticating/authorization subsystem you can use nginx/apache/your web server
    .htaccess-like rules by limiting access to the ``/business_logic/`` url path.
