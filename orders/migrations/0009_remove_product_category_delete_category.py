# Generated by Django 5.0.3 on 2024-03-27 22:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0008_category_product_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='category',
        ),
        migrations.DeleteModel(
            name='Category',
        ),
    ]
