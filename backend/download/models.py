from django.db import models
from django.contrib.auth.models import User
from stls.models import STL 
# Create your models here.
class DownloadsByUser(models.Model):
    fkUser = models.ForeignKey(User, on_delete=models.CASCADE)
    fkSTL = models.ForeignKey(STL, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.fkUser.username} {self.fkSTL.name}"