from rest_framework import serializers
from .models import User,Post,Comment,Category
from django.contrib.auth import authenticate
from django.core.validators import validate_email
from django.contrib.auth.password_validation import validate_password

class loginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username,password=password)
        if user is None:
            raise serializers.ValidationError('Invalid username or password')
        data['user'] = user
        return data
    
class registrationSerializer(serializers.ModelSerializer):
        email = serializers.EmailField(required= True)
        password = serializers.CharField(write_only = True,validators =[validate_password])

        class Meta:
            model = User
            fields = ('username','email','password')
    
        def validate_email(self,value):
            if User.objects.filter(email=value).exists():
                raise serializers.ValidationError('user already exists')
            
            # validate_email[value]
            return value
        def create(self,validated_data):
            user = User(
                username= validated_data['username'],
                email = validated_data['email'],
            )
            user.set_password(validated_data['password'])
            user.save()
            return user

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'
class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    created_at = serializers.ReadOnlyField()
    updated_at = serializers.ReadOnlyField()

    comments = CommentSerializer(many=True,read_only = True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'created_at','updated_at' ,'comments']
        