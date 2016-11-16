rm sites/dev/db.sqlite3
python manage.py migrate
python manage.py loaddata sites/dev/fixtures/data.json

