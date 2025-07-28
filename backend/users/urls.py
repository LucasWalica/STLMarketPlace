from django.urls import path, include
from .views import (
    UserCreateView, LoginView, GoogleLoginView,
    MakerCreateView, MakerUpdateView, MakerDetailView
    )

urlpatterns = [
    path("register/", UserCreateView.as_view()),
    path("login/", LoginView.as_view()),
    path("google-login/", GoogleLoginView.as_view()),
    path("maker/create/", MakerCreateView.as_view()),
    path("maker/update/<int:id>/", MakerUpdateView.as_view()),
    path("maker/<int:id>/", MakerDetailView.as_view())
]
