from django.db import models

class Repository(models.Model):
    package_name = models.CharField(max_length=100)

