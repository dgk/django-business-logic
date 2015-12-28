# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business_logic', '0005_programargumentfield'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='programargumentfield',
            options={'ordering': ('name',), 'verbose_name': 'Program argument field', 'verbose_name_plural': 'Program argument fields'},
        ),
        migrations.AlterModelOptions(
            name='programtype',
            options={'verbose_name': 'Program type', 'verbose_name_plural': 'Program types'},
        ),
    ]
