from django.db import models

class Package(models.Model):
    name = models.CharField(max_length=255, unique=True)
    count = models.IntegerField(default=1)

    def increment_count(self):
        self.count += 1
        self.save()

    def __str__(self):
        return self.name

class Repos(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

