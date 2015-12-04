# -*- coding: utf-8 -*-

# pandoc --from=markdown --to=rst README.md -o README.rst

import os
import codecs
from distutils.core import setup
from setuptools import find_packages
from pip.req import parse_requirements


PACKAGE = "business_logic"
NAME = "django-business-logic"
DESCRIPTION = "django business logic programming made easy"
AUTHOR = "Dmitry Kuksinsky"
AUTHOR_EMAIL = "dgk@dgk.su"

VERSION = __import__(PACKAGE).VERSION


URL = "https://github.com/dgk/django-business-logic"


def path(*parts):
    return os.path.join(os.path.dirname(__file__), *parts)


setup(
        name=NAME,
        packages=find_packages(exclude=('demo',)),
        version=VERSION,
        description=DESCRIPTION,
        long_description=codecs.open(path('README.rst'), encoding='utf-8').read(),
        author=AUTHOR,
        author_email=AUTHOR_EMAIL,
        url=URL,
        #download_url='{}/archive/{}.tar.gz'.format(URL, VERSION),
        package_dir={PACKAGE: PACKAGE},
        package_data={
            PACKAGE: [
                'locale/*/LC_MESSAGES/django.[mp]o',
                'fixtures/*.json',
            ]
        },
        license='MIT',
        keywords=['django', ],
        classifiers=[
            "Development Status :: 2 - Pre-Alpha",
            "Environment :: Web Environment",
            "Intended Audience :: Developers",
            "License :: OSI Approved :: MIT License",
            "Operating System :: OS Independent",
            "Programming Language :: Python",
            "Framework :: Django",
        ],
        zip_safe=False,
        install_requires=[str(x.req)
                          for x in parse_requirements(path('requirements.txt'))],
)
