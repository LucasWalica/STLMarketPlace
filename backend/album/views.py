from django.shortcuts import render
from .models import Album
from .serializers import AlbumSerializer
from rest_framework import generics
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from .pagination import PaginationAlbumViewList
# Create your views here.


class AlbumCreateView(generics.CreateAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

class AlbumUpdateView(generics.UpdateAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    lookup_field = "id"

    def get_object(self):
        album = get_object_or_404(Album, id=self.kwargs["id"])
        if album.fkUser != self.request.user:
            raise PermissionDenied("You cannot update this object")
        return album

class AlbumDeleteView(generics.DestroyAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    lookup_field = "id"

    def get_object(self):
        album = get_object_or_404(Album, id=self.kwargs["id"])
        if album.fkUser != self.request.user:
            raise PermissionDenied("You cannot update this object")
        return album

class AlbumListOwnerView(generics.ListAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    pagination_class = PaginationAlbumViewList

    def get_queryset(self):
        user = self.request.user 
        return Album.objects.filter(fkUser = user)
    

class AlbumListByUser(generics.ListAPIView):
    parser_classes = [JSONParser]
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    pagination_class = PaginationAlbumViewList

    def get_queryset(self):
        user_id = self.kwargs.get("id")
        return Album.objects.filter(fkUser__id=user_id)
    
class AlbumList(generics.ListAPIView):
    parser_classes = [JSONParser]
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    pagination_class = PaginationAlbumViewList

        
