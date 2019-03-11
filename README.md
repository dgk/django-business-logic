# django-business-logic


[![travis-ci](https://img.shields.io/travis/dgk/django-business-logic/master.svg)](http://travis-ci.org/dgk/django-business-logic?branch=master)
[![codecov](https://img.shields.io/codecov/c/github/dgk/django-business-logic.svg)](https://codecov.io/gh/dgk/django-business-logic)
[![codeclimate](https://img.shields.io/codeclimate/maintainability/dgk/django-business-logic.svg)](https://codeclimate.com/github/dgk/django-business-logic)
[![readthedocs](https://readthedocs.org/projects/django-business-logic/badge/?version=latest)](https://django-business-logic.readthedocs.org/)
[![MIT license](https://img.shields.io/pypi/l/django-business-logic.svg)](https://django-business-logic.readthedocs.io/en/latest/license.html)
[![python versions](https://img.shields.io/pypi/pyversions/django-business-logic.svg)](https://pypi.org/project/django-business-logic/)
[![django versions](https://img.shields.io/pypi/djversions/django-business-logic.svg)](https://pypi.org/project/django-business-logic/)
[![pypi versions](https://img.shields.io/pypi/v/django-business-logic.svg)](https://pypi.org/project/django-business-logic/)
[![pypi versions status](https://img.shields.io/pypi/status/django-business-logic.svg)](https://pypi.org/project/django-business-logic/)

## Introduction

Processes change more often than technic. Domain Rules are situational and may
differ from customer to customer. With diverse code and frequent changes, the code
becomes complicated, then the probability of errors increases. One of the
optimal strategies to avoid this situation is to isolate client logic at the
data level.
When this is the case, programmers need only to watch the correct interpretation
of the rules, but not each of the rules separately. This reduces the amount of
code base needed and reduces the possibility of introducing errors.  Another
question is the form of the description of these rules takes. A visual graphical
representation is optimal for users – this helps to avoid confusion with a variety
of conditions, and helps users understand what is written without any effort.
Many web applications need to use Domain Specific Languages (DSL) during their
lifecycle.  Any type of project, from hobby-level to enterprise, may have this
requirement. There are many ways to carry out this task, such as doing your own
development using internal resources or contractors (you know the cost in both
cases), buying a turnkey solution, (really?) or an adapted solution. In all
cases, you will also need to be a coach for all DSL users.


Stop now and focus your attention here.
The [Blockly](https://opensource.google.com/projects/blockly) visual
programming library was released in 2012, and since 2014 it has been developed
with the support of Google. [Code.org](https://code.org/), a related project
that uses Blockly in its main subsystems, has had hundreds of millions of users
of different ages in its [Hour of Code](https://hourofcode.com/) project.
These users started as young as elementary school, and very quickly learned how
to program using the amazing Blockly library.
Even top universities teach block-based coding (e.g., 
[Berkeley](http://bjc.berkeley.edu/), [Harvard](https://cs50.harvard.edu/)).
But Blockly is not just a trainer or a toy. It is suitable for serious tasks:
form processing, workflows, reporting, email marketing, bots, tests, surveys,
quizzes and many other purposes.

The django-business-logic library tries to utilise the block programming
approach to delegate programming tasks to non-programmers by implementing a
framework for creating and working with Visual Domain Specific Languages.


The library comes with:

* pretty easy integration: minor changes in INSTALLED_APPS and root urlconf
* support of many types of built-in django model fields: all numeric, boolean, string, foreign keys
* logical division into interface/program/version: firstly define an "interface" object which is just a named set of django models and its fields; after you can create one or more named "programs" which implements the given interface and than release any number of the program's "versions"
* easy invocation injecting of visually edited code: a few strings in your code, at any place - a view controller, signal handler, asynchronous task, no matter the monolith or microservice
* dropdown controls with custom model object list; you need only register your custom models in the standard django admin interface
* ability to easily integrate and make accessible to the visual editor two types of python functions: imported (from python built-in, third-party or your own module) and editable through django admin
* easy to understand Blockly-based log viewer with the ability to inspect intermediate values

Do not forget that this library is not designed with professional developers in
mind, so the interface may look ugly and awkward in a professional developer’s
eyes. Try to disengage from this feeling. Think like a human who gets panicked
when seeing (our lovely) code with obscure brackets, odd commas, strange
arrows, and so on.
We, the development part of the team, can help our teammates from other
departments to do more.
Let’s bring the spirit of our successful sprints and fun development rooms to
colleagues from management, marketing, sales, logistics and many others.


## Documentation

See full documentation: https://django-business-logic.readthedocs.io/en/latest/

## Support us

Any feedback would be greatly appreciated.

If you are familiar with react/mobx and want to help us build django-business-logic library, please contact us at dgk@dgk.su.


## License
MIT license