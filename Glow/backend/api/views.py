from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.forms import UserCreationForm
import json

def home(request):
    return HttpResponse("Hello from Django!")

@csrf_exempt # Allow POST requests for signup
def signup(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            confirm_password = data.get("confirm_password")

            if not username or not password or not confirm_password:
                return JsonResponse({"error:" "All fields are required."}, status=400)
            
            if password != confirm_password:
                return JsonResponse({"error": "Passwords do not match."}, status=400)
            
            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username already taken."}, status=400)
            
            user = User.objects.create_user(username=username, password=password)
            return JsonResponse({"message": "User created successfully!"}, status=201)
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid data."}, status=400)
   
    return JsonResponse({"error": "Invalid request method."}, status=405)


    

