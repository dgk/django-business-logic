rm sites/dev/db.sqlite3
rm business_logic/migrations/0*
python manage.py makemigrations business_logic
python manage.py migrate
python manage.py loaddata sites/dev/fixtures/data.json

