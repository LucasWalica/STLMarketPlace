from django.db import models
from django.contrib.auth.models import User
from album.models import Album
from django.core.validators import MinValueValidator


# Create your models here.
class STL(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)
    description = models.TextField(max_length=300, blank=False, null=False)
    stlUrl = models.URLField(blank=False, null=False)
    fkUser = models.ForeignKey(User, on_delete=models.CASCADE)
    # we can complicate it but for now it will stay like this ( categories could be another table, enum, etc...)
    category1 = models.CharField(max_length=100, blank=True, null=True)
    category2 = models.CharField(max_length=100, blank=True, null=True)
    price = models.DecimalField(blank=True, null=True, decimal_places=2, max_digits=8, validators=[MinValueValidator(2)])
    downloads = models.IntegerField(default=0, blank=False, null=False)
    likes = models.IntegerField(default=0, blank=False, null=False)

    
    def __str__(self):
        return f"{self.pk} {self.name} {self.fkUser.username}"

#many to many relation
class STLOnAlbum(models.Model):
    fkAlbum = models.ForeignKey(Album, on_delete=models.DO_NOTHING)
    fkSTL = models.ForeignKey(STL, on_delete=models.DO_NOTHING)

    def __str__(self):
        return f"Album:{self.fkAlbum.name} STL:{self.fkSTL.name}"