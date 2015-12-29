# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
        ('business_logic', '0010_auto_20151228_1447'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReferenceDescriptor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('search_fields', models.TextField()),
                ('content_type', models.ForeignKey(to='contenttypes.ContentType')),
            ],
            options={
                'verbose_name': 'Reference descriptor',
                'verbose_name_plural': 'Reference descriptors',
            },
        ),
    ]
