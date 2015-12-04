# -*- coding: utf-8 -*-

from distutils.core import setup

from setuptools import find_packages

VERSION='0.007'

PACKAGE = "business_logic"
NAME = "django-business-logic"
DESCRIPTION = "django business logic programming made easy"
AUTHOR = "Dmitry Kuksinsky"
AUTHOR_EMAIL = "dgk@dgk.su"

URL = "https://github.com/dgk/django-business-logic"

setup(
        name=NAME,
        packages=find_packages(exclude=('demo',)),
        version=VERSION,
        description=DESCRIPTION,
        author=AUTHOR,
        author_email=AUTHOR_EMAIL,
        url=URL,
        #download_url='{}/archive/{}.tar.gz'.format(URL, VERSION),
        package_dir={PACKAGE: PACKAGE},
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
        install_requires=filter(None, open('requirements.txt').readlines()),
)
