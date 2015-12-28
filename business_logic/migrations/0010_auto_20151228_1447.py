# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business_logic', '0009_auto_20151228_1222'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Reference',
        ),
        migrations.AlterField(
            model_name='programargument',
            name='program_type',
            field=models.ForeignKey(related_name='argument', to='business_logic.ProgramType'),
        ),
        migrations.AlterField(
            model_name='programargumentfield',
            name='program_argument',
            field=models.ForeignKey(related_name='field', to='business_logic.ProgramArgument'),
        ),
    ]
