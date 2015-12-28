# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business_logic', '0006_auto_20151228_1115'),
    ]

    operations = [
        migrations.RenameField(
            model_name='programargumentfield',
            old_name='program_type',
            new_name='program_argument',
        ),
    ]
