from django.contrib import admin
from .models import STLNormalImage, STLOnAlbum, STL
# Register your models here.


admin.site.register(STLOnAlbum)
admin.site.register(STLNormalImage)
admin.site.register(STL)

