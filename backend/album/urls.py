from django.urls import path 
from .views import ( 
    AlbumCreateView, AlbumUpdateView, AlbumDeleteView,
    AlbumList, AlbumListByUser, AlbumListOwnerView
)

urlpatterns = [
    path("create/", AlbumCreateView.as_view()),
    path("update/<int:id>/", AlbumUpdateView.as_view()),
    path("delete/<int:id>/", AlbumDeleteView.as_view()),
    path("list/", AlbumList.as_view()),
    path("list/<int:id>/", AlbumListByUser.as_view()),
    path("list/owner/", AlbumListOwnerView.as_view())
]
