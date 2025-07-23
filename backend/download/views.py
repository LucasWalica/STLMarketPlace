from django.shortcuts import render
from rest_framework import generics
from .serializers import DownloadSerializer
from .models import DownloadsByUser
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser
from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
# Create your views here.


#manage payment
class CreateDownloadView(generics.CreateAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = DownloadsByUser.objects.all()
    serializer_class = DownloadSerializer
