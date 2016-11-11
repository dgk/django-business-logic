# -*- coding: utf-8 -*-

# pandoc --from=markdown --to=rst README.md -o README.rst

import os
import codecs
import re
import sys
import shutil
from setuptools import setup, find_packages

from pip.req import parse_requirements


PACKAGE = "business_logic"
NAME = "django-business-logic"
DESCRIPTION = "django business logic programming made easy"
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
    return [dirpath
            for dirpath, dirnames, filenames in os.walk(package)
            if os.path.exists(os.path.join(dirpath, '__init__.py'))]

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
        filepaths.extend([os.path.join(base, filename)
                          for filename in filenames])
    return {package: filepaths}


def path(*parts):
    return os.path.join(os.path.dirname(__file__), *parts)

def clean():
    for d in ('dist', 'build', '{}.egg-info'.format(NAME.replace('-', '_'))):
        if os.path.exists(d):
            shutil.rmtree(d)


if sys.argv[-1] == 'publish':
    try:
        import pypandoc
    except ImportError:
        print("pypandoc not installed.\nUse `pip install pypandoc`.\nExiting.")

    clean()

    #if os.system("pip freeze | grep wheel"):
    #    print("wheel not installed.\nUse `pip install wheel`.\nExiting.")
    #    sys.exit()
    if os.system("pip freeze | grep twine"):
        print("twine not installed.\nUse `pip install twine`.\nExiting.")
        sys.exit()
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
        long_description=codecs.open(path('README.rst'), encoding='utf-8').read(),
        author=AUTHOR,
        author_email=AUTHOR_EMAIL,
        url=URL,
        #download_url='{}/archive/{}.tar.gz'.format(URL, VERSION),
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
        keywords=['django', ],
        classifiers=[
            'Development Status :: 2 - Pre-Alpha',
            'Environment :: Web Environment',
            'Intended Audience :: Developers',
            'License :: OSI Approved :: MIT License',
            'Operating System :: OS Independent',
            'Programming Language :: Python :: 2.7',
            'Programming Language :: Python :: 3.4',
            'Programming Language :: Python :: 3.5',
            'Topic :: Internet :: WWW/HTTP',
            'Framework :: Django',
        ],
        zip_safe=False,
        install_requires=[
            str(x.req) for x
                in parse_requirements(path('requirements.txt'), session=False)
            ],
)
