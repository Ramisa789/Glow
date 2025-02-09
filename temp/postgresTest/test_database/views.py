# from django.shortcuts import render

# # Create your views here.
# test_database/views.py
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import YourModel  # Replace with your actual model
from .serializers import YourModelSerializer  # We'll create this

# Add this to views.py
class YourModelViewSet(viewsets.ModelViewSet):
    queryset = YourModel.objects.all()
    serializer_class = YourModelSerializer

# Optional: Add a test endpoint
@api_view(['GET'])
def test_api(request):
    return Response({"message": "Backend is connected!"})

# test_database/serializers.py (create this file)
from rest_framework import serializers
from .models import YourModel

class YourModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = YourModel
        fields = '__all__'  # Or list specific fields

# test_database/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'items', views.YourModelViewSet)  # Replace 'items' with your endpoint name

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/test/', views.test_api, name='test-api'),
]

# postgresTest/urls.py (main urls.py)
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('test_database.urls')),
]

# settings.py (add these settings)
INSTALLED_APPS = [
    # ... existing apps
    'rest_framework',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Add this at the top
    # ... other middleware
]

# During development, allow all origins
CORS_ALLOW_ALL_ORIGINS = True