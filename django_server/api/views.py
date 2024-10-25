from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from . import models
from . import serializers

# Create your views here.
# user create
class UserCreateView(generics.CreateAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    
# user list
class UserListView(generics.ListAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    
# user details
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return models.User.objects.filter(id=self.request.user.id)
    
# logout
class LogoutApiView(generics.GenericAPIView):
    serializer_class = serializers.LogoutUserSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

# profiles list
class ProfileListView(generics.ListAPIView):
    serializer_class = serializers.ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return models.Profile.objects.filter(user = self.request.user)
    
# profile details
class ProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return models.Profile.objects.filter(user = self.request.user)
    
# booking list create
class BookingListCreateView(generics.ListCreateAPIView):
    serializer_class = serializers.BookingSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return models.Booking.objects.filter(user = self.request.user)
    
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

# booking details
class BookingDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.BookingSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return models.Booking.objects.filter(user = self.request.user)
    
# review list create
class ReviewListCreateView(generics.ListCreateAPIView):
    queryset = models.Review.objects.all()
    serializer_class = serializers.ReviewSerializer
    permission_classes = [IsAuthenticated]
    
# review details
class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.ReviewSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return models.Review.objects.filter(user = self.request.user)
    
# newsletter list create
class NewsletterListCreateView(generics.ListCreateAPIView):
    queryset = models.Newsletter_Mail.objects.all()
    serializer_class = serializers.Newsletter_MailSerializer
    permission_classes = [AllowAny]
    
# newsletter details
class NewsletterDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.Newsletter_MailSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return models.Newsletter_Mail.objects.filter(user = self.request.user)
    
# service list create
class ServiceListCreateView(generics.ListCreateAPIView):
    queryset = models.Service.objects.all()
    serializer_class = serializers.ServiceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
# service details
class ServiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.ServiceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        return models.Service.objects.filter(user = self.request.user)
