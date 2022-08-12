from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('plants_data/', views.PlantsView.as_view(), name="plants data"),
    path('update_plant/<int:plant_id>', views.SpecificPlantView.as_view(), name="update specific plants info")
]