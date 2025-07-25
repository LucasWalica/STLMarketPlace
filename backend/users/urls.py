from django.urls import path, include
from .views import UserCreateView, LoginView

urlpatterns = [
    path("register/", UserCreateView.as_view()),
    path("login/", LoginView.as_view()),
    path("social/", include("allauth.socialaccount.urls"))
]
