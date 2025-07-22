from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from rest_framework import exceptions
from django.contrib.auth.password_validation import validate_password

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = User.USERNAME_FIELD

    def validate(self, attrs):
        username_or_email = attrs.get('username')
        password = attrs.get('password')
        if '@' in username_or_email:
            try:
                user_obj = User.objects.get(email=username_or_email)
                username_or_email = user_obj.username
            except User.DoesNotExist:
                raise exceptions.AuthenticationFailed('No user found with this email')

        user = authenticate(request=self.context.get('request'), username=username_or_email, password=password)
        if user is None:
            raise exceptions.AuthenticationFailed('No active account found with the given credentials')
        
        attrs['username'] = username_or_email
        data = super().validate(attrs)
        
        data['username'] = user.username

        return data

class RegisterSerializer(serializers.ModelSerializer):
    
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email')
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password2": "Password fields didn't match."})

        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(
            username = validated_data['username'],
            email = validated_data['email'],
        )

        user.set_password(validated_data['password'])

        user.save()

        return user