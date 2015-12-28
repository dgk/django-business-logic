# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business_logic', '0003_auto_20151228_1056'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='programargument',
            unique_together=set([('program_type', 'name')]),
        ),
    ]
