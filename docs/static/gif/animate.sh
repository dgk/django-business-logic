#!/usr/bin/env bash

for GROUP in `ls *.png | cut -d_ -f1 | sort | uniq`
do
echo $GROUP
ls ${GROUP}_*.png
convert -delay 120 -loop 0 ${GROUP}_*.png ${GROUP}.gif
done
