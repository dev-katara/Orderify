# Generated by Django 5.0.3 on 2024-03-29 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0011_product_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='category_images/'),
        ),
    ]
