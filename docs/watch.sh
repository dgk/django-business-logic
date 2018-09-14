#!/usr/bin/env bash
#
if [ $# -eq 0 ]
then
CMD='make html'
else
CMD='rm -rf build && make html'
fi
THRESHOLD=30
DATE=1

inotifywait --monitor --recursive --event modify --event create --exclude '.*\.*pyc$' --exclude __pycache__ --exclude build . ../business_logic | while read FILE
do
echo $FILE
CURDATE=`date +%s`
if [ $(($CURDATE - $THRESHOLD)) -gt $DATE ]
then
DATE=$CURDATE
bash -c "$CMD"
else
echo already built
fi
done


#inotifywait --monitor --recursive --event modify --event create --exclude build . ../business_logic | while read noop; do bash -c "$CMD"; done
