# django-business-logic

[![build-status-image]][travis] [![coverage-image]][codecov] [![license-image]][license] ![pyversions-image] ![version-image] ![status-image]

**django business logic programming made easy**

## Install
There are a few different ways you can install django-business-logic:

* Use pip: `pip install -U django-business-logic`
* Download the zipfile from the [releases](https://github.com/dgk/django-business-logic/releases) page and install it. 
* Checkout the source: `git clone git://github.com/dgk/django-business-logic.git` and install it yourself.

## Getting Started

1. Edit `settings.py` and add  `business_logic` to your `INSTALLED_APPS` 
    
        # settings.py
        INSTALLED_APPS = (
          ...
          'business_logic',
          'rest_framework', # optional, for browsable API only
          ...
        )

1. Edit `urls.py` and include `business_logic.urls`
 
        # urls.py
        urlpatterns = (
          ...
          url('^business-logic/', include('business_logic.urls')),
          ...
        )

## Development

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
#### Installing dependecies

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
