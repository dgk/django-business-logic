#!/usr/bin/env bash
if [ -z "$1" ]
then
ARGS=business_logic.tests
else
ARGS=$1
fi
python manage.py test $ARGS

