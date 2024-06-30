from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from . import models
from . import serializers

# Create your views here.
# user create
class UserCreateView(generics.CreateAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    
# user list
class UserListView(generics.ListAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer
    
# user details
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer
    # permission_classes = [IsAuthenticated]
    
    # def get_queryset(self):
    #     return models.CustomUser.objects.filter(user_id = self.kwargs['user_id'])
