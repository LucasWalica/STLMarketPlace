from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User 
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .serializers import UserSerializer, MakerSerializer
from .models import Maker
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import PermissionDenied
from rest_framework import status
from django.shortcuts import get_object_or_404
from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework.exceptions import NotFound
# Create your views here.

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.save()
        
        if not user:
            return Response({'error':"invalid credentialds"}, status=401)

        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "token":token.key,
            "user": {
                "id": user.id,
                    "email": user.email,
                },
            }, status=201)
    

#login 
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        # Importante: authenticate espera username, por eso ponemos email en username
        user = authenticate(username=username, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
            }, status=200)
        else:
            return Response({"error": "Invalid credentials"}, status=401)
        



class GoogleLoginView(APIView):
    def post(self, request):
        id_token_str = request.data.get('token')
        if not id_token_str:
            return Response({'error': 'Token no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Verificar el token contra Google
            idinfo = id_token.verify_oauth2_token(id_token_str, requests.Request())

            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Issuer inválido')

            email = idinfo.get('email')
            name = idinfo.get('name')

            if not email:
                return Response({'error': 'No se obtuvo email del token'}, status=status.HTTP_400_BAD_REQUEST)

            # Buscar o crear usuario
            user, created = User.objects.get_or_create(email=email, defaults={'username': email, 'first_name': name})
            
            # Generar token
            token, _ = Token.objects.get_or_create(user=user)

            return Response({'token': token.key}, status=status.HTTP_200_OK)

        except ValueError as e:
            return Response({'error': 'Token inválido', 'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class MakerCreateView(generics.CreateAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = Maker.objects.all()
    serializer_class = MakerSerializer

    def perform_create(self, serializer):
        print(self.request.user)
        serializer.save(fkUser=self.request.user)

class MakerUpdateView(generics.UpdateAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = Maker.objects.all()
    serializer_class = MakerSerializer
    lookup_field = "id"

    def get_object(self):
        maker = get_object_or_404(Maker, id=self.kwargs["id"])
        if maker.fkUser != self.request.user:
            raise PermissionDenied("you cannot update this object")
        return maker
    
class MakerDetailView(generics.RetrieveAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = Maker.objects.all()
    serializer_class = MakerSerializer
    lookup_field = "id"

class OwnMakerProfile(generics.RetrieveAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = Maker.objects.all()
    serializer_class = MakerSerializer

    def get_object(self):
        try:
            return Maker.objects.get(fkUser=self.request.user)
        except Maker.DoesNotExist:
            raise NotFound(detail="Maker profile doesn't exist")