from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User 
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .serializers import UserSerializer
from rest_framework import status
from google.oauth2 import id_token
from google.auth.transport import requests
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
