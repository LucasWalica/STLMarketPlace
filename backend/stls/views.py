from django.shortcuts import render
from rest_framework import generics
from .serializers import STLSerializer, STLOnAlbumSerializer, STLSelectInputSerializer
from .models import STL, STLOnAlbum, STLNormalImage
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser
from django.core.exceptions import PermissionDenied, ValidationError
from django.contrib.auth.models import User
from .pagination import PaginationSTLViewList
from download.models import DownloadsByUser
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
# Create your views here.


class CreateSTLView(generics.CreateAPIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = STL.objects.all()
    serializer_class = STLSerializer

    def perform_create(self, serializer):
        data = self.request.data
        stl_instance = serializer.save(
            fkUser=self.request.user,
            file_url=data.get("file_url")  # 👈 Firebase file URL
        )

        # 👇 Lista de imágenes desde Firebase
        images = data.getlist("images") if hasattr(data, 'getlist') else data.get("images", [])
        
        for image_url in images:
            STLNormalImage.objects.create(
                fkSTL=stl_instance,
                file_url=image_url
            )




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
    queryset = STL.objects.all()
    serializer_class = STLSerializer
    pagination_class = PaginationSTLViewList

    def get_queryset(self):
        user = self.request.user
        return (
            STL.objects
            .exclude(fkUser=user)
            .order_by('-likes', '-downloads')
        )

class STLViewListByUser(generics.ListAPIView):
    parser_classes = [JSONParser]
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

class STLListByAlbum(generics.ListAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    serializer_class = STLSelectInputSerializer

    def get_queryset(self):
        album_id = self.kwargs.get("id")
        return STL.objects.filter(stlonalbum__fkAlbum__id=album_id)
    

class STLListByAlbumPaginated(generics.ListAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    serializer_class = STLSerializer
    pagination_class = PaginationSTLViewList

    def get_queryset(self):
        album_id = self.kwargs.get("id")
        return STL.objects.filter(stlonalbum__fkAlbum__id=album_id)
    
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


#view that allows to get all the stls to manage them in the album
class SelectInputOwnerSTLListView(generics.ListAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = STL.objects.all()
    serializer_class = STLSelectInputSerializer
    lookup_field = "album_id"

    def get_queryset(self):
        user = self.request.user
        album_id = self.kwargs.get("album_id")
        # Excluir los STLs que ya estén en ese álbum
        stls_in_album = STLOnAlbum.objects.filter(fkAlbum_id=album_id).values_list('fkSTL_id', flat=True)
        return STL.objects.filter(fkUser=user).exclude(id__in=stls_in_album)
    

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
    
    def perform_create(self, serializer):
        stl = serializer.validated_data.get("fkSTL")
        album = serializer.validated_data.get("fkAlbum")

        # Chequeo si la relación ya existe
        if STLOnAlbum.objects.filter(fkSTL=stl, fkAlbum=album).exists():
            raise ValidationError("This STL is already added to the album.")

        serializer.save()
    
class DeleteSTLonAlbumView(generics.DestroyAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = STLOnAlbum.objects.all()
    serializer_class = STLOnAlbumSerializer

    def get_object(self):
        album_id = self.kwargs["album_id"]
        stl_id = self.kwargs["stl_id"]

        stl_on_album = get_object_or_404(
            STLOnAlbum,
            fkAlbum_id=album_id,
            fkSTL_id=stl_id
        )

        if stl_on_album.fkSTL.fkUser != self.request.user:
            raise PermissionDenied("You cannot delete this object.")

        return stl_on_album
    

