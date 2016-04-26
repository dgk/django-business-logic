# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business_logic', '0004_auto_20160425_1412'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='programversion',
            unique_together=set([]),
        ),
    ]
