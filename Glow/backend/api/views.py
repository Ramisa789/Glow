from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
import google.generativeai as genai
from django.conf import settings
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

@csrf_exempt # Allow POST requests for login
def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"message": "Login successful!"}, status=200)
        else:
            return JsonResponse({"message": "Invalid credentials!"}, status=400)
        
    return JsonResponse({"message": "Invalid request method!"}, status=400)


genai.configure(api_key=settings.GEMINI_API_KEY)

@api_view(['POST'])
def generate_response(request):
    print("debugging print statment for this url")
    user_input = request.data.get("prompt", "")
    model = genai.GenerativeModel("gemini")
    response = model.generate_content(user_input)
    
    return Response({"response": response.text})



    

