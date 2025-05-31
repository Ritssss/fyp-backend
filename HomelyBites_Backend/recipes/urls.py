from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile, Recipe
from .serializers import RecipeListSerializer

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'recipes', views.RecipeViewSet)
router.register(r'user-profiles', views.UserProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('users/', views.list_users, name='list_users'),
    path('homepage/', views.homepage, name='homepage'),
    path('recommendations/', views.recommend_recipes, name='recommend_recipes'),
]

@api_view(['GET'])
def search_recipes(request):
    # Dummy response for now
    return Response({"message": "Search endpoint works!"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recommend_recipes(request):
    # Try to get or create the user profile
    user_profile, created = UserProfile.objects.get_or_create(user=request.user)
    dietary_pref = user_profile.dietary_preference
    allergies = user_profile.allergies.split(',') if user_profile.allergies else []
    dislikes = user_profile.dislikes.split(',') if user_profile.dislikes else []

    # Filter recipes based on dietary preference
    recipes = Recipe.objects.all()
    if dietary_pref:
        recipes = recipes.filter(categories__name__icontains=dietary_pref)
    # Exclude recipes with ingredients the user is allergic to or dislikes
    for allergy in allergies:
        recipes = recipes.exclude(ingredients__icontains=allergy.strip())
    for dislike in dislikes:
        recipes = recipes.exclude(ingredients__icontains=dislike.strip())

    recipes = recipes.distinct()
    serializer = RecipeListSerializer(recipes, many=True)
    return Response(serializer.data)
