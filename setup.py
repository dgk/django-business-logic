# -*- coding: utf-8 -*-

import os
import codecs
import re
import sys
import shutil
from setuptools import setup

try:  # for pip >= 10
    from pip._internal.req import parse_requirements
except ImportError:  # for pip <= 9.0.3
    from pip.req import parse_requirements

PACKAGE = "business_logic"
NAME = "django-business-logic"
DESCRIPTION = "Visual DSL framework for django"
AUTHOR = "Dmitry Kuksinsky"
AUTHOR_EMAIL = "dgk@dgk.su"

URL = "https://github.com/dgk/django-business-logic"


def get_version(package):
    """
    Return package version as listed in `__version__` in `init.py`.
    """
    init_py = open(os.path.join(package, '__init__.py')).read()
    return re.search("__version__ = ['\"]([^'\"]+)['\"]", init_py).group(1)


version = get_version(PACKAGE)


def get_packages(package):
    """
    Return root package and all sub-packages.
    """
    return [
        dirpath for dirpath, dirnames, filenames in os.walk(package)
        if os.path.exists(os.path.join(dirpath, '__init__.py'))
    ]


def get_package_data(package):
    """
    Return all files under the root package, that are not in a
    package themselves.
    """
    walk = [(dirpath.replace(package + os.sep, '', 1), filenames)
            for dirpath, dirnames, filenames in os.walk(package)
            if not os.path.exists(os.path.join(dirpath, '__init__.py'))]

    filepaths = []
    for base, filenames in walk:
        filepaths.extend([os.path.join(base, filename) for filename in filenames])
    return {package: filepaths}


def abs_path(*parts):
    return os.path.join(os.path.dirname(__file__), *parts)


def clean():
    for d in ('dist', 'build', '{}.egg-info'.format(NAME.replace('-', '_'))):
        if os.path.exists(d):
            shutil.rmtree(d)


if sys.argv[-1] == 'publish':

    clean()
    if os.system("pip freeze | grep twine"):
        print("twine not installed.\nUse `pip install twine`.\nExiting.")
        sys.exit(1)

    os.system("python setup.py sdist bdist_wheel")
    os.system("twine upload dist/*")
    print("You probably want to also tag the version now:")
    print("  git tag -a %s -m 'version %s'" % (version, version))
    print("  git push --tags")
    sys.exit()

setup(
    name=NAME,
    version=get_version(PACKAGE),
    description=DESCRIPTION,
    long_description='\n'.join(
        map(lambda x: codecs.open(abs_path(x), encoding='utf-8').read(), ['README.rst', 'README.pip.footer.rst'])),
    author=AUTHOR,
    author_email=AUTHOR_EMAIL,
    url=URL,
    download_url='{}/archive/{}.tar.gz'.format(URL, version),
    packages=get_packages(PACKAGE),
    package_data={
        PACKAGE: [
            'locale/*/LC_MESSAGES/django.[mp]o',
            'static/business_logic/*.html',
            'static/business_logic/*.js',
            'static/business_logic/*.map',
            'static/business_logic/blockly/*',
            'static/business_logic/src/assets/fonts/*',
        ]
    },
    license='MIT',
    keywords=[
        'django',
    ],
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Topic :: Internet :: WWW/HTTP',
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
        'Framework :: Django',
        'Framework :: Django :: 1.11',
        'Framework :: Django :: 2.0',
        'Framework :: Django :: 2.1',
    ],
    zip_safe=False,
    install_requires=[
        '{}; {}'.format(x.req, x.markers) if x.markers else str(x.req)
        for x in parse_requirements(abs_path('requirements.txt'), session=False)
    ],
)
