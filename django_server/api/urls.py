from django.urls import path
from . import views 

urlpatterns = [
    path('users/register/', views.UserCreateView.as_view(), name='user_create'),
    path('users/', views.UserListView.as_view(), name='users_list'),
    path('users/<uuid:pk>/', views.UserDetailView.as_view(), name='user_detail'),
    
    path('profiles/', views.ProfileListView.as_view(), name='profiles_list'),
    path('profiles/<uuid:pk>/', views.ProfileDetailView.as_view(), name='profile_detail'),
    
    path('bookings/', views.BookingListCreateView.as_view(), name='bookings_list'),
    path('bookings/<uuid:pk>/', views.BookingDetailView.as_view(), name='booking_detail'),
    
    path('reviews/', views.ReviewListCreateView.as_view(), name='reviews_list'),
    path('reviews/<uuid:pk>/', views.ReviewDetailView.as_view(), name='review_detail'),
    
    path('services/', views.ServiceListCreateView.as_view(), name='services_list'),
    path('services/<uuid:pk>/', views.ServiceDetailView.as_view(), name='service_detail'),
    
    path('newsletters/', views.NewsletterListCreateView.as_view(), name='newsletters_list'),
    path('newsletters/<uuid:pk>/', views.NewsletterDetailView.as_view(), name='newsletter_detail'),
]