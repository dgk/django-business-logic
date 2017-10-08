release: python manage.py migrate && python manage.py loaddata sites/dev/fixtures/data.json
web: gunicorn sites.dev.heroku.wsgi --log-file -
