from django.shortcuts import render
from rest_framework import generics
from .serializers import STLSerializer, STLOnAlbumSerializer
from .models import STL, STLOnAlbum
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser
from django.core.exceptions import PermissionDenied
from django.contrib.auth.models import User
from .pagination import PaginationSTLViewList
from download.models import DownloadsByUser
from django.shortcuts import get_object_or_404
# Create your views here.


class CreateSTLView(generics.CreateAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = STL.objects.all()
    serializer_class = STLSerializer


class UpdateSTLView(generics.UpdateAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = STL.objects.all()
    serializer_class = STLSerializer
    lookup_field = "id"
    
    def get_object(self):
        stl = get_object_or_404(STL, id=self.kwargs["id"])
        if stl.fkUser != self.request.user:
            raise PermissionDenied("you cannot update this object")
        return stl
    
class STLViewList(generics.ListAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = STL.objects.all()
    serializer_class = STLSerializer
    pagination_class = PaginationSTLViewList

class STLViewListByUser(generics.ListAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = STL.objects.all()
    serializer_class = STLSerializer
    pagination_class = PaginationSTLViewList
    lookup_field = "user_id"

    def get_queryset(self):
        user_id = self.kwargs.get("user_id")
        return STL.objects.filter(fkUser__pk = user_id)

class STLViewListOwner(generics.ListAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = STL.objects.all()
    serializer_class = STLSerializer
    pagination_class = PaginationSTLViewList

    def get_queryset(self):
        user = self.request.user 
        return STL.objects.filter(fkUser = user)
    
# view that allows to see downloaded stls 
class DownloadedSTLListView(generics.ListAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = STL.objects.all()
    serializer_class = STLSerializer
    pagination_class = PaginationSTLViewList

    def get_queryset(self):
        user = self.request.user 
        # Obtiene los IDs de STL descargados por el usuario
        downloaded_ids = DownloadsByUser.objects.filter(fkUser=user).values_list('fkSTL_id', flat=True)

        # Retorna los objetos STL asociados a esos IDs
        return STL.objects.filter(id__in=downloaded_ids)

    

class DeleteSTLView(generics.DestroyAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = STL.objects.all()
    serializer_class = STLSerializer
    lookup_field = "id"

    def get_object(self):
        stl = get_object_or_404(STL, id=self.kwargs["id"])
        if stl.fkUser != self.request.user:
            raise PermissionDenied("you cannot update this object")
        return stl
    

class CreateSTLOnAlbumView(generics.CreateAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = STLOnAlbum.objects.all()
    serializer_class = STLOnAlbumSerializer

class DeleteSTLonAlbumView(generics.DestroyAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = STLOnAlbum.objects.all()
    serializer_class = STLOnAlbumSerializer
    lookup_field = "id"

    def get_object(self):
        stlOnAlbum = get_object_or_404(STLOnAlbum, id=self.kwargs["id"])
        if stlOnAlbum.fkSTL.fkUser != self.request.user:
            raise PermissionDenied("you cannot update this object")
        return stlOnAlbum