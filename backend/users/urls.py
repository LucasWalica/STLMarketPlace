from django.urls import path, include
from .views import UserCreateView, LoginView, GoogleLoginView

urlpatterns = [
    path("register/", UserCreateView.as_view()),
    path("login/", LoginView.as_view()),
    path("google-login/", GoogleLoginView.as_view()),
]
