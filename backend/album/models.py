from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Album(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)
    description = models.TextField(max_length=500, blank=False, null=False)
    fkUser = models.ForeignKey(User, on_delete=models.CASCADE)
    price = models.DecimalField(blank=True, null=True, decimal_places=2, max_digits=8)
    downloads = models.IntegerField(default=0, blank=False, null=False)
    likes = models.IntegerField(default=0, blank=False, null=False)

    def __str__(self):
        return f"ID: {self.pk} name: {self.name} user username:{self.fkUser.username}"
    
