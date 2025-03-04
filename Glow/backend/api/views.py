from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
import google.generativeai as genai
from django.conf import settings
import json
from api.models import Product, Routine, RoutineProduct
from decimal import Decimal

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
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(user_input)
    
    return Response({"response": response.text})

def save_routine_table(user, routine_time, products):
    # Cascade delete old routine and its routine-products
    Routine.objects.filter(user=user, time_of_day=routine_time).delete()

    # Create new routine table
    routine, _ = Routine.objects.get_or_create(user=user, time_of_day=routine_time)

    for product_data in products:
        # Update or create new products
        print(product_data["name"].strip(), "/--/", Decimal(product_data["price"].strip()), sep = "")
        product, _ = Product.objects.update_or_create(
            name=product_data["name"].strip(),
            defaults={"price": Decimal(product_data["price"].strip())}
        )

        RoutineProduct.objects.get_or_create(
            routine=routine,
            product=product,
            instructions=product_data["application"]
        )
        
    print("Routine created!!!")

@api_view(['POST'])
def save_routine(request):
    print("debugging print statment for this url")

    user = User.objects.first()  # Change this to the actual user instance
    data = request.data

    # Get list of database values for routine time choices
    routine_times = [choice[0] for choice in Routine._meta.get_field("time_of_day").choices]

    for routine_time in data:
        if routine_time not in routine_times:
            print("Invalid routine time.")
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        
        save_routine_table(user, routine_time, data[routine_time])
        


    return JsonResponse({"message": "Routines saved successfully!"}, status=200)


@api_view(["POST"])
def get_routine(request):
    # Use actual user id for getting routine
    user = User.objects.first()

    routines = Routine.objects.filter(user=user)
    routine_data = dict()

    for routine in routines:
        routine_products = RoutineProduct.objects.filter(routine=routine)

        routine_product_data = []

        for routine_product in routine_products:
            product_data = {
                "step": routine_product.id,  # or use routine_product's specific step value
                "name": routine_product.product.name,
                "price": str(routine_product.product.price),  # Convert to string to match the JSON format
                "application": routine_product.instructions
            }

            routine_product_data.append(product_data)
        
        routine_data[routine.time_of_day] = routine_product_data

    return JsonResponse({"response" : json.dumps(routine_data)})
    