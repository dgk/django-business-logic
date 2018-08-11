FROM python:3.6-alpine

ARG VERSION
ARG VCS_REF
ARG BUILD_DATE

LABEL org.label-schema.schema-version="1.0" \
      org.label-schema.vcs-url="https://github.com/dgk/django-business-logic/" \
      org.label-schema.version="$VERSION" \
      org.label-schema.vcs-ref="$VCS_REF" \
      org.label-schema.build-date="$BUILD_DATE"


RUN mkdir /app
ADD . /app
WORKDIR app

RUN apk add --no-cache libxslt && \
    apk add --no-cache --virtual .build-deps g++ python-dev libxslt-dev && \
    pip install -r requirements.dev.txt && \
    python setup.py install && \
    apk del .build-deps

RUN python manage.py migrate && \
    python manage.py loaddata sites/dev/fixtures/data.json

EXPOSE 8000
ENTRYPOINT ["python", "manage.py"]
CMD ["runserver",  "0.0.0.0:8000"]

