# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business_logic', '0003_auto_20160425_1312'),
    ]

    operations = [
        migrations.AlterField(
            model_name='programversion',
            name='is_default',
            field=models.BooleanField(default=False, verbose_name='Is default'),
        ),
    ]
