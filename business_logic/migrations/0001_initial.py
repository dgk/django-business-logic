# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Argument',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, verbose_name=b'Title')),
                ('order', models.PositiveIntegerField(default=0, verbose_name=b'Order')),
            ],
            options={
                'ordering': ('order',),
                'verbose_name': 'Program argument',
                'verbose_name_plural': 'Program arguments',
            },
        ),
        migrations.CreateModel(
            name='ArgumentSet',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, verbose_name=b'Title')),
            ],
            options={
                'verbose_name': 'Program argument set',
                'verbose_name_plural': 'Program argument sets',
            },
        ),
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'Assignment',
                'verbose_name_plural': 'Assignments',
            },
        ),
        migrations.CreateModel(
            name='BinaryOperator',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('operator', models.CharField(max_length=3, verbose_name=b'Operator')),
            ],
            options={
                'verbose_name': 'Binary operator',
                'verbose_name_plural': 'Binary operators',
            },
        ),
        migrations.CreateModel(
            name='BooleanConstant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('value', models.BooleanField(verbose_name=b'Value')),
            ],
            options={
                'verbose_name': 'Boolean constant',
                'verbose_name_plural': 'Boolean constants',
            },
        ),
        migrations.CreateModel(
            name='BreakLoop',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'Break instruction',
                'verbose_name_plural': 'Break instructions',
            },
        ),
        migrations.CreateModel(
            name='DateConstant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('value', models.DateField(verbose_name=b'Value')),
            ],
            options={
                'verbose_name': 'Date constant',
                'verbose_name_plural': 'Date constants',
            },
        ),
        migrations.CreateModel(
            name='DecimalConstant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('value', models.DecimalField(verbose_name=b'Value', max_digits=18, decimal_places=4)),
            ],
            options={
                'verbose_name': 'Decimal constant',
                'verbose_name_plural': 'Decimal constants',
            },
        ),
        migrations.CreateModel(
            name='FloatConstant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('value', models.FloatField(verbose_name=b'Value')),
            ],
            options={
                'verbose_name': 'Float constant',
                'verbose_name_plural': 'Float constants',
            },
        ),
        migrations.CreateModel(
            name='ForeachStatement',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'Foreach statement',
                'verbose_name_plural': 'Foreach statements',
            },
        ),
        migrations.CreateModel(
            name='Function',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'Function',
                'verbose_name_plural': 'Functions',
            },
        ),
        migrations.CreateModel(
            name='FunctionDefinition',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('module', models.CharField(default=b'__builtins__', max_length=255, verbose_name=b'Module name')),
                ('function', models.CharField(max_length=255, verbose_name=b'Function name')),
                ('context_required', models.BooleanField(default=False, verbose_name=b'Context required')),
                ('title', models.CharField(max_length=255, verbose_name=b'Function title')),
            ],
            options={
                'verbose_name': 'Function definition',
                'verbose_name_plural': 'Function definitions',
            },
        ),
        migrations.CreateModel(
            name='IfStatement',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'If statement',
                'verbose_name_plural': 'If statements',
            },
        ),
        migrations.CreateModel(
            name='IntegerConstant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('value', models.IntegerField(verbose_name=b'Value')),
            ],
            options={
                'verbose_name': 'Integer constant',
                'verbose_name_plural': 'Integer constants',
            },
        ),
        migrations.CreateModel(
            name='ListConstant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'List constant',
                'verbose_name_plural': 'List constants',
            },
        ),
        migrations.CreateModel(
            name='LogEntry',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('sib_order', models.PositiveIntegerField()),
                ('previous_value', models.CharField(max_length=255, verbose_name=b'Previous value')),
                ('current_value', models.CharField(max_length=255, verbose_name=b'Current value')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('text', models.TextField(max_length=1024, verbose_name=b'Message')),
            ],
            options={
                'verbose_name': 'Message',
                'verbose_name_plural': 'Messages',
            },
        ),
        migrations.CreateModel(
            name='MessageType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, verbose_name=b'Title')),
            ],
            options={
                'verbose_name': 'Message type',
                'verbose_name_plural': 'Message types',
            },
        ),
        migrations.CreateModel(
            name='ModelConstant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('value', models.BooleanField(verbose_name=b'Value')),
            ],
            options={
                'verbose_name': 'Model constant',
                'verbose_name_plural': 'Model constants',
            },
        ),
        migrations.CreateModel(
            name='Node',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('lft', models.PositiveIntegerField(db_index=True)),
                ('rgt', models.PositiveIntegerField(db_index=True)),
                ('tree_id', models.PositiveIntegerField(db_index=True)),
                ('depth', models.PositiveIntegerField(db_index=True)),
                ('comment', models.CharField(max_length=255, null=True, verbose_name=b'Comment', blank=True)),
                ('object_id', models.PositiveIntegerField(null=True)),
                ('content_type', models.ForeignKey(to='contenttypes.ContentType', null=True)),
            ],
            options={
                'ordering': ['tree_id', 'lft'],
                'verbose_name': 'Program node',
                'verbose_name_plural': 'Program nodes',
            },
        ),
        migrations.CreateModel(
            name='Program',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, verbose_name=b'Title')),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('modification_time', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Program',
                'verbose_name_plural': 'Programs',
            },
        ),
        migrations.CreateModel(
            name='ProgramType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, verbose_name=b'Title')),
                ('input_argumets', models.ForeignKey(related_name='inputs', verbose_name=b'Input arguments', to='business_logic.ArgumentSet')),
                ('output_argumets', models.ForeignKey(related_name='outputs', verbose_name=b'Output arguments', to='business_logic.ArgumentSet')),
            ],
            options={
                'verbose_name': 'Program type',
                'verbose_name_plural': 'Program types',
            },
        ),
        migrations.CreateModel(
            name='ProgramVersion',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, verbose_name=b'Title')),
                ('creation_time', models.DateTimeField(auto_now_add=True)),
                ('modification_time', models.DateTimeField(auto_now=True)),
                ('entry_point', models.ForeignKey(verbose_name=b'Entry point', to='business_logic.Node')),
                ('program', models.ForeignKey(related_name='versions', to='business_logic.Program')),
            ],
            options={
                'verbose_name': 'Program version',
                'verbose_name_plural': 'Program versions',
            },
        ),
        migrations.CreateModel(
            name='Reference',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, verbose_name=b'Title')),
            ],
            options={
                'verbose_name': 'Reference',
                'verbose_name_plural': 'References',
            },
        ),
        migrations.CreateModel(
            name='Result',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'Result',
                'verbose_name_plural': 'Results',
            },
        ),
        migrations.CreateModel(
            name='ResultMessage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('message', models.ForeignKey(to='business_logic.Message')),
                ('result', models.ForeignKey(related_name='messages', to='business_logic.Result')),
            ],
            options={
                'verbose_name': 'Result message',
                'verbose_name_plural': 'Result messages',
            },
        ),
        migrations.CreateModel(
            name='StopInterpretation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'Stop instruction',
                'verbose_name_plural': 'Stop instructions',
            },
        ),
        migrations.CreateModel(
            name='StringConstant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('value', models.TextField(default=b'', verbose_name=b'Value')),
            ],
            options={
                'verbose_name': 'String constant',
                'verbose_name_plural': 'String constants',
            },
        ),
        migrations.CreateModel(
            name='Table',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'Table',
                'verbose_name_plural': 'Tables',
            },
        ),
        migrations.CreateModel(
            name='Type',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('type', models.CharField(max_length=12, verbose_name=b'Type', choices=[(b'bool', b'Boolean'), (b'decimal', b'Decimal'), (b'float', b'Float'), (b'int', b'Integer'), (b'string', b'String'), (b'model', b'Model')])),
                ('is_list', models.BooleanField(verbose_name=b'Is list')),
                ('model_type', models.ForeignKey(verbose_name=b'Model type', to='contenttypes.ContentType', null=True)),
            ],
            options={
                'verbose_name': 'Type',
                'verbose_name_plural': 'Types',
            },
        ),
        migrations.CreateModel(
            name='UnaryOperator',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('operator', models.CharField(max_length=3, verbose_name=b'Operator')),
            ],
            options={
                'verbose_name': 'Unary operator',
                'verbose_name_plural': 'Unary operators',
            },
        ),
        migrations.CreateModel(
            name='Variable',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name': 'Variable',
                'verbose_name_plural': 'Variables',
            },
        ),
        migrations.CreateModel(
            name='VariableDefinition',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.TextField(verbose_name=b'Variable name')),
            ],
            options={
                'verbose_name': 'Variable definition',
                'verbose_name_plural': 'Variable definitions',
            },
        ),
        migrations.AddField(
            model_name='variable',
            name='definition',
            field=models.ForeignKey(related_name='variables', to='business_logic.VariableDefinition'),
        ),
        migrations.AddField(
            model_name='program',
            name='active_version',
            field=models.ForeignKey(related_name='active', verbose_name=b'Active version', blank=True, to='business_logic.ProgramVersion', null=True),
        ),
        migrations.AddField(
            model_name='program',
            name='testing_version',
            field=models.ForeignKey(related_name='testing', verbose_name=b'Testing version', blank=True, to='business_logic.ProgramVersion', null=True),
        ),
        migrations.AddField(
            model_name='program',
            name='type',
            field=models.ForeignKey(related_name='programs', to='business_logic.ProgramType'),
        ),
        migrations.AddField(
            model_name='message',
            name='type',
            field=models.ForeignKey(to='business_logic.MessageType'),
        ),
        migrations.AddField(
            model_name='logentry',
            name='node',
            field=models.ForeignKey(verbose_name=b'Program node', to='business_logic.Node'),
        ),
        migrations.AddField(
            model_name='logentry',
            name='parent',
            field=models.ForeignKey(related_name='children', blank=True, to='business_logic.LogEntry', null=True),
        ),
        migrations.AddField(
            model_name='function',
            name='definition',
            field=models.ForeignKey(related_name='functions', to='business_logic.FunctionDefinition'),
        ),
        migrations.AddField(
            model_name='argument',
            name='argument_set',
            field=models.ForeignKey(verbose_name=b'Program argument set', to='business_logic.ArgumentSet'),
        ),
        migrations.AddField(
            model_name='argument',
            name='content_type',
            field=models.ForeignKey(to='contenttypes.ContentType'),
        ),
        migrations.AlterUniqueTogether(
            name='argument',
            unique_together=set([('argument_set', 'order')]),
        ),
    ]
