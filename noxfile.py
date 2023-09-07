import os
import nox
import pathlib

PYTHON_VERSIONS = [
    '3.8',
    '3.9',
    '3.10',
    '3.11',
]

DEFAULT_PYTHON_VERSION = '3.11'

DJANGO_VERSIONS = [
    '3.2',
    '4.0',
    '4.1',
    '4.2',
]


@nox.session
def dev(session: nox.Session) -> None:
    venv_dir = pathlib.Path('./.venv').resolve()

    session.install('virtualenv')
    session.run('virtualenv', '-p', DEFAULT_PYTHON_VERSION, os.fsdecode(venv_dir), silent=True)

    python = os.fsdecode(venv_dir.joinpath('bin/python'))
    session.run(python, '-m', 'pip', 'install', '-r', 'requirements.dev.txt', external=True)


@nox.session(python=PYTHON_VERSIONS, tags=['unittests'])
@nox.parametrize('django', DJANGO_VERSIONS)
def unittest(session, django):
    major, minor = map(lambda x: int(x), django.split('.'))
    session.install(f'Django >= {django}, < {major}.{minor + 1}')

    if django == '3.2':
        session.install('django-admin-sortable2==1.0.4')

    session.install('-r', 'requirements.test.txt')

    session.env['DJANGO_SETTINGS_MODULE'] = 'sites.test.settings'
    session.run('py.test', 'tests')


@nox.session(reuse_venv=True, tags=['formatting'])
def flake8(session):
    session.install('flake8')
    session.run('flake8', 'business_logic', 'tests', 'sites', '--exclude=*/migrations/*')
