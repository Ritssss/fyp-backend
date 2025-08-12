from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import Recipe, Category, UserProfile, CustomUser, UserRecipeInteraction
import requests
from django.conf import settings
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.conf import settings
import requests

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class RecipeSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Recipe
        fields = '__all__'

class RecipeListSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'slug', 'image_url', 'prep_time', 'cook_time', 'difficulty', 'categories']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    favorite_categories = CategorySerializer(many=True, read_only=True)
    profile_image = serializers.ImageField(max_length=None, allow_empty_file=True, required=False)
    has_completed_questions = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'profile_image', 'favorite_categories', 'dietary_preference', 'allergies', 'dislikes', 'has_completed_questions']
        read_only_fields = ['id', 'user', 'has_completed_questions']

    def update(self, instance, validated_data):
        if 'profile_image' in validated_data:
            if instance.profile_image:
                instance.profile_image.delete(save=False)
            instance.profile_image = validated_data['profile_image']
        instance.dietary_preference = validated_data.get('dietary_preference', instance.dietary_preference)
        instance.allergies = validated_data.get('allergies', instance.allergies)
        instance.dislikes = validated_data.get('dislikes', instance.dislikes)
        instance.save()
        return instance

class UserRecipeInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRecipeInteraction
        fields = ['id', 'user', 'recipe', 'interaction_type', 'rating', 'timestamp']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(
        required=True, 
        validators=[UniqueValidator(
            queryset=CustomUser.objects.all(),
            message="This email address is already in use."
        )]
    )

    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True}
        }

    def validate_email(self, value):
        # Normalize email to avoid duplicates due to case/whitespace
        value = value.strip().lower()

        api_key = getattr(settings, 'ABSTRACT_API_KEY', None)
        if not api_key:
            raise serializers.ValidationError("Email verification service is not configured.")
        try:
            response = requests.get(
                "https://emailvalidation.abstractapi.com/v1/",
                params={"api_key": api_key, "email": value},
                timeout=6,
            )
            data = response.json() if response.ok else {}
        except requests.RequestException:
            raise serializers.ValidationError("Unable to verify email at the moment. Please try again.")

        if data.get('deliverability') != 'DELIVERABLE':
            raise serializers.ValidationError("Please enter a valid, deliverable email address.")
        return value

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = CustomUser.objects.create_user(**validated_data)
        user.is_active = False  # User can't login until email is verified
        user.save()
        UserProfile.objects.create(user=user)
        # Attempt to send verification email; rollback user on failure
        try:
            self.send_verification_email(user)
        except Exception as exc:
            # Delete the user to prevent inactive accounts without a verification email
            try:
                user.delete()
            finally:
                raise serializers.ValidationError({"email": "Failed to send verification email. Please try again later."})
        return user

    def send_verification_email(self, user):
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        # Prefer backend activation endpoint directly to avoid frontend routing issues
        backend_base_url = getattr(settings, 'BACKEND_BASE_URL', 'http://127.0.0.1:8000')
        activation_link = f"{backend_base_url}/api/activate/{uid}/{token}/"
        
        # Create a more user-friendly email
        subject = 'Welcome to HomelyBites! Please verify your email'
        message = f"""
Hello {user.first_name}!

Welcome to HomelyBites! To complete your registration and start exploring delicious recipes, please click the link below to verify your email address:

{activation_link}

After clicking the link, you'll be able to log in to your account and start your culinary journey!

If you didn't create an account with HomelyBites, please ignore this email.

Best regards,
The HomelyBites Team
        """
        
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

class PasswordResetConfirmSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    token = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs


