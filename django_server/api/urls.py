from django.urls import path
from . import views 

urlpatterns = [
    path('users/register/', views.UserCreateView.as_view(), name='user_create'),
    path('users/', views.UserListView.as_view(), name='users_list'),
    path('users/<uuid:pk>/', views.UserDetailView.as_view(), name='user_detail'),
]