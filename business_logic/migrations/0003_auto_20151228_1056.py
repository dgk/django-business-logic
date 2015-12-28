# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business_logic', '0002_auto_20151228_0831'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProgramType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, verbose_name='Title', db_index=True)),
                ('name', models.SlugField(null=True, max_length=255, blank=True, unique=True, verbose_name='Name')),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('modification_time', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Program',
                'verbose_name_plural': 'Programs',
            },
        ),
        migrations.AlterUniqueTogether(
            name='programargument',
            unique_together=set([]),
        ),
        migrations.RemoveField(
            model_name='programargument',
            name='program',
        ),
        migrations.AddField(
            model_name='program',
            name='program_type',
            field=models.ForeignKey(default=1, to='business_logic.ProgramType'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='programargument',
            name='program_type',
            field=models.ForeignKey(default=1, to='business_logic.ProgramType'),
            preserve_default=False,
        ),
    ]
