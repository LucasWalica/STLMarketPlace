from django.urls import path 
from .views import (
    CreateSTLView, UpdateSTLView, 
    STLViewList, STLViewListByUser, 
    STLViewListOwner, DeleteSTLView, STLGetByIdView,
    DownloadedSTLListView,
    DeleteSTLonAlbumView, CreateSTLOnAlbumView, 
    SelectInputOwnerSTLListView, STLListByAlbum, STLListByAlbumPaginated)


urlpatterns = [
    path("stl/create/", CreateSTLView.as_view()),
    path("stl/update/<int:id>/", UpdateSTLView.as_view()),
    path("stl/list/", STLViewList.as_view()),
    path("stl/list/<int:user_id>/", STLViewListByUser.as_view()),
    path("stl/get/<int:id>/", STLGetByIdView.as_view()),
    path("stl/list/owner/", STLViewListOwner.as_view()),
    path("stl/list/album/<int:id>/", STLListByAlbum.as_view()),
    path("stl/list/album/paginated/<int:id>/", STLListByAlbumPaginated.as_view()),
    path("stl/delete/<int:id>/", DeleteSTLView.as_view()),
    path("stl/list/input/<int:album_id>/", SelectInputOwnerSTLListView.as_view()),
    path("stl/downloaded/", DownloadedSTLListView.as_view()),
    path("stlAlbumEntry/create/", CreateSTLOnAlbumView.as_view()),
    path("stlAlbumEntry/delete/<int:album_id>/<int:stl_id>/", DeleteSTLonAlbumView.as_view()),
]
