# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business_logic', '0004_auto_20151228_1057'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProgramArgumentField',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.SlugField(max_length=255, verbose_name='Name')),
                ('program_type', models.ForeignKey(to='business_logic.ProgramArgument')),
            ],
        ),
    ]
