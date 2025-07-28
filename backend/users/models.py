from django.db import models
from django.contrib.auth.models import User


#maybe add a maker profile
class Maker(models.Model):
    fkUser = models.OneToOneField(User, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=100)
    bio = models.TextField(blank=False)
    avatar = models.CharField(blank=False, null=False)
    instagram = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    tiktok = models.URLField(blank=True)

    def __str__(self):
        return self.display_name or self.user.username

# need to be implemented
class PasswordReset(models.Model):
    email = models.EmailField()
    token = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)


