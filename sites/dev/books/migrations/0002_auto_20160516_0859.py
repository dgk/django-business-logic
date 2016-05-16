# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='author',
            name='email',
        ),
        migrations.RemoveField(
            model_name='publisher',
            name='address',
        ),
        migrations.RemoveField(
            model_name='publisher',
            name='city',
        ),
        migrations.RemoveField(
            model_name='publisher',
            name='country',
        ),
        migrations.RemoveField(
            model_name='publisher',
            name='state_province',
        ),
        migrations.RemoveField(
            model_name='publisher',
            name='website',
        ),
        migrations.AddField(
            model_name='publisher',
            name='rank',
            field=models.IntegerField(default=0),
        ),
    ]
