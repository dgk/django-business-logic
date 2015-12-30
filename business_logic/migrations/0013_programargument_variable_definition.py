# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business_logic', '0012_auto_20151230_0841'),
    ]

    operations = [
        migrations.AddField(
            model_name='programargument',
            name='variable_definition',
            field=models.OneToOneField(default=1, to='business_logic.VariableDefinition'),
            preserve_default=False,
        ),
    ]
