from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.registration, name='registration'),
    path('login/', views.loginPage, name='loginPage'),
    path('logout/', views.logoutUser, name='logout'),
    path('api/vehicles/create', views.VehicleListCreateView.as_view(), name='vehicle-list-create'),
    path('api/vehicles/<int:pk>/', views.VehicleDetailView.as_view(), name='vehicle-detail'),
    path('api/rentals/create', views.RentalListCreateView.as_view(), name='rental-list-create'),
    path('api/rentals/<int:pk>/', views.RentalDetailView.as_view(), name='rental-detail'),
    path('api/vehicles/', views.VehicleListView.as_view(), name='vehicle-list'),
    path('api/rentals/', views.RentalListView.as_view(), name='rental-list'),
    path('api/current_user/', views.CurrentUserAPIView.as_view(), name='current-user'),
]
