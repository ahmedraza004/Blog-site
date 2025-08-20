from django.shortcuts import render
from rest_framework import status,generics
from rest_framework.response import Response
from .serializers import PostSerializer,registrationSerializer,CommentSerializer,loginSerializer,CategorySerializer
from rest_framework.permissions import AllowAny,IsAdminUser,IsAuthenticated
from rest_framework import serializers
from rest_framework.viewsets import ModelViewSet
from .models import Post,Comment,Category
from rest_framework.views import APIView
from django.contrib.auth import login
# Create your views here.

class RegisterView(generics.CreateAPIView):
    serializer_class = registrationSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response('User is Register Successfully',status=status.HTTP_201_CREATED)
        raise serializers.ValidationError('Invalid credentials',status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    serializer_class = loginSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = loginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)  # logs in the user (creates session)
            return Response({'message': 'Login successful'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class PostViewset(ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

class CommentViewset(ModelViewSet):
    serializer_class =CommentSerializer
    queryset =  Comment.objects.all()

class CategoryViewset(ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()



