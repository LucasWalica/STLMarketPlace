from django.urls import path 

from .views import CreateDownloadView

urlpatterns = [
    path("download/create/", CreateDownloadView.as_view())
]
