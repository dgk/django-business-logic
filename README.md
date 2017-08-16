# django-business-logic

[![build-status-image]][travis] [![coverage-image]][codecov] [![license-image]][license] ![pyversions-image] ![version-image] ![status-image]


## Introduction

The main goal of this project is to provide django site users (such as administrators or ordinal users) with
ability to visually edit business logic layer. This library implements execution engine and code editor
based on awesome [blockly library][blockly].

## Warning

> Please note that this software is still Alpha/Beta quality and is not recommended for production use.
> The library is currently in active development and any API may be changed. Migration history for models is not supported now.
> Some internal objects are world writable!

## Architecture

Internally program code is stored as special django models such as NumberConstant, IfStatement,
Assignment and so forth. Structure of syntax tree is held by class Node derived from treebeard.NS_Node.
Operators and operands are linked with Node objects via django contenttypes system.
Other details are briefly described below in sections [Administrative setup](#administrative-setup) and [Execution](#execution)

## Install
There are a few different ways you can install django-business-logic:

* Use pip: `pip install -U django-business-logic`
* Download the zipfile from the [releases](https://github.com/dgk/django-business-logic/releases) page and install it. 
* Checkout the source: `git clone git://github.com/dgk/django-business-logic.git` and install it yourself.

## Server setup

1. Edit `settings.py` and add  `business_logic` to your `INSTALLED_APPS` 
    
        # settings.py
        INSTALLED_APPS = (
          ...
          'django.contrib.contenttypes',
          'rest_framework', # optional, for browsable API only
          'nested_inline',
          'business_logic',
          ...
        )

1. Edit `urls.py` and include `business_logic.urls`
 
        # urls.py
        urlpatterns = (
          ...
          url('^business-logic/', include('business_logic.urls')),
          ...
        )

1. Make migrations
```bash
python manage.py migrate
```
1. Collect static files
```bash
python manage.py collectstatic
```


## Administrative setup

First you should define one or more ProgramInterface objects via django admin interface ([http://localhost:8000/admin/business_logic/programinterface/](http://localhost:8000/admin/business_logic/programinterface/)).

Each ProgramInterface must contain one or more ProgramArgument objects.
The ProgramArgument object represents one instance of django.db.Model 
derived class specified as django.contrib.contentypes.ContentType instance (e.g. for your custom Order model) and his keyword argumet name (e.g. `order`).

Each ProgramArgument object must contain one or more ProgramArgumentField 
which represents one field of django model
(e.g. `sum` for Order object or `delivery_address.city` for `city` field nested into Order DeliveryAddress model).

If you want to use system-wide references (e.g. your custom City or ProductCategory django model)
and you define represented ProgramArgumentField you should register referenced model via django admin interface([http://localhost:8000/admin/business_logic/referencedescriptor/](http://localhost:8000/admin/business_logic/referencedescriptor/)).

Next create one or more Program objects which must implements described ProgramInterface(e.g.
named "On Order create" with  "on_order_create" `code` field for programmatic access)

## Visual Programming
After setup you can go to web editor interface
([http://localhost:8000/static/business_logic/index.html](http://localhost:8000/static/business_logic/index.html)),
choose program interface, program, create and start editing your first program version.

## Execution

You may inject execution engine call at arbitrary place of your code, such as custom form.save, model.post_save methods, any django.dispatch.Signal handler or so on.
Just instantiate appropriate ProgramVersion object and pass kwargs described in the ProgramInterface admin page to its execute() method .
e.g. 

```python

from django.views.generic.edit import CreateView

from business_logic.models import Program

class OrderCreate(CreateView):
    def form_valid(self, form):
       order = form.save()
       program = Program.objects.get(code="on_order_create")
       program_version = program.versions.order_by("id").last()
       program_version.execute(order=order)
```

ProgramVersion.execute() method can accept instance of business_logic.Context object.
If this parameter omitted execute() method creates new instance of Context with default parameters.

It can be initialized by the following parameters:
* log(boolean) - create execution log (default - False)
* debug(boolean) - create special Execution object contained all variables passed to execute() method, 
 ProgramVersion object, start and end execution times, and root of log objects if its created (default - False)

ProgramVersion.execute() returns the Context instance. 


## Credits

Many thanks to:
* [contributors][contributors] of this library
* authors of blockly, django, django-rest-framework, django-treebeard and angular 2.
* all folks from Insurance Technologies LLC ([b2bpolis.ru](http://b2bpolis.ru/), @b2bpolis), 
St.Petersburg, Russia and personally to its CEO Roman Kurdoev @romankurdo

## TODO
- [ ] References support
- [ ] Execution log viewer
- [ ] Imported and editable via admin interface python functions
- [ ] Visually editable functions and its libraries
- [ ] Two-dimensional constant tables (matrices)
- [ ] Code sharing
- [ ] Pure python code generation for execution speedup

## Library Development

### Backend development environment
#### virtualenv
Virtualenv is probably what you want to use during development.
Once you have virtualenv installed, just fire up a shell and create your own environment.
```
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
pip install -r requirements.dev.txt
```
#### Installing test data
```
python manage.py migrate
python manage.py loaddata sites/dev/fixtures/data.json
```
#### Running backend dev server

```
python manage.py runserver
```
An instance of django dev server will be listening on http://localhost:8000/ .
Now you can login into django admin interface http://localhost:8000/admin/
with username `test` and password `test`.
### Frontend development environment
Fronted source files located under `frontend` folder.
```
cd frontend
```
#### Installing dependencies

```
npm install
```
#### Running webpack dev server

```
npm run server:dev:hmr
```
Now webpack dev server will be listening on http://localhost:3000/ .

#### Building frontend files
```
npm run build:prod
```

### Running tests
#### Running backend tests
```
python manage.py test
```
#### Test it all
You need to know at least one command; the one that runs all the tests:

```
tox
```



[build-status-image]: https://img.shields.io/travis/dgk/django-business-logic.svg
[coverage-image]: https://img.shields.io/codecov/c/github/dgk/django-business-logic.svg
[codecov]: https://codecov.io/gh/dgk/django-business-logic
[travis]: http://travis-ci.org/dgk/django-business-logic?branch=master
[license-image]: https://img.shields.io/pypi/l/django-business-logic.svg
[license]: https://github.com/dgk/django-business-logic/blob/master/LICENSE.txt
[pyversions-image]: https://img.shields.io/pypi/pyversions/django-business-logic.svg
[version-image]: https://img.shields.io/pypi/v/django-business-logic.svg
[status-image]: https://img.shields.io/pypi/status/django-business-logic.svg


[contributors]: https://github.com/dgk/django-business-logic/graphs/contributors
[blockly]: https://developers.google.com/blockly/
