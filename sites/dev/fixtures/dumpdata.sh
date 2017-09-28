python manage.py dumpdata --natural-foreign --indent 4 \
-e sessions -e contenttypes -e admin.logentry -e auth.permission \
-e business_logic.logentry -e business_logic.execution -e business_logic.executionargument \
> sites/dev/fixtures/data.json

