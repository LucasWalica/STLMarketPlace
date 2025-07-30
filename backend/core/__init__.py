import cloudinary
from django.conf import settings

cloudinary.config(
    cloud_name=settings.CLOUDINARY['cloud_name'],
    api_key=settings.CLOUDINARY['api_key'],
    api_secret=settings.CLOUDINARY['api_secret'],
    secure=True
)