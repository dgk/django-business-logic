import nox

PYTHON_VERSIONS = [
    '3.8',
    '3.9',
    '3.10',
    '3.11',
]

DJANGO_VERSIONS = [
    '3.2',
    '4.0',
    '4.1',
    '4.2',
]


@nox.session(name='python', python=PYTHON_VERSIONS)
@nox.parametrize('django', DJANGO_VERSIONS)
def unittest(session, django):
    major, minor = map(lambda x: int(x), django.split('.'))
    session.install(f'Django >= {django}, < {major}.{minor + 1}')

    if django == '3.2':
        session.install('django-admin-sortable2==1.0.4')

    session.install('-rrequirements.test.txt')

    session.env['DJANGO_SETTINGS_MODULE'] = 'sites.test.settings'
    session.run('py.test', 'tests')
