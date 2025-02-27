from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, UserDetailsView, ForgotPasswordView, ResetPasswordView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path('api/forgot-password/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('api/reset-password/', ResetPasswordView.as_view(), name='reset-password'),
    path("api-auth/", include("rest_framework.urls")),
    path("api/user/details/", UserDetailsView.as_view(), name="user_details"),
    path("api/", include("api.urls")),
]