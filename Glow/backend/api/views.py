from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework.decorators import authentication_classes, permission_classes
from django.conf import settings
import json
from api.models import Product, Routine, RoutineProduct
from decimal import Decimal
from http import HTTPStatus
from api.QueryBuilder import QueryBuilder
from api.LLMAdapter import LLMConnection
from api.GeminiAdapter import GeminiAdapter

llmConnection = LLMConnection(GeminiAdapter(settings.GEMINI_API_KEY, "gemini-2.0-flash")) 

def home(request):
    return HttpResponse("Hello from Django!")

@csrf_exempt # Allow POST requests for signup
def signup(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Invalid request method."}, status=HTTPStatus.METHOD_NOT_ALLOWED)

    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        confirm_password = data.get("confirm_password")

        if not username or not password or not confirm_password:
            return JsonResponse({"error": "All fields are required."}, status=HTTPStatus.BAD_REQUEST)
        
        if password != confirm_password:
            return JsonResponse({"error": "Passwords do not match."}, status=HTTPStatus.BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already taken."}, status=HTTPStatus.BAD_REQUEST)
        
        user = User.objects.create_user(username=username, password=password)
        login(request, user)

        token, created = Token.objects.get_or_create(user=user)
        return JsonResponse({"message": "User created successfully!", "token": token.key}, status=HTTPStatus.CREATED)
    
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid data."}, status=HTTPStatus.BAD_REQUEST)

@csrf_exempt # Allow POST requests for login
def user_login(request):
    if request.method != 'POST':
        return JsonResponse({"message": "Invalid request method!"}, status=HTTPStatus.BAD_REQUEST)
    
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    user = authenticate(request, username=username, password=password)
    if user is None:
        return JsonResponse({"message": "Invalid credentials!"}, status=HTTPStatus.BAD_REQUEST)
    
    token, created = Token.objects.get_or_create(user=user)
    return JsonResponse({"message": "Login successful!", "token": token.key}, status=HTTPStatus.OK)


def generate_query(formData):
    queryBuilder = QueryBuilder()
    query = (queryBuilder.add_skin_type(formData["skin_type"])
             .add_routine_type(formData["routine_type"])
             .add_skin_concerns(formData["skin_concerns"])
             .add_product_criteria(formData["product_criteria"])
             .add_allergies(formData["allergies"])
             .add_skin_conditions(formData["skin_conditions"])
             .add_budget(formData["budget"])
             .add_min_price(formData["min_price"])
             .add_max_price(formData["max_price"])
             .build()
    )

    return query

@api_view(['POST'])
@authentication_classes([])  # Allow unauthenticated access
@permission_classes([])  # No permission restrictions
def generate_response(request):
    try:
        query = generate_query(request.data['formData'])
        response = llmConnection.generate_response(query)
        # Extract actual JSON from response (removing triple backticks)
        response = response.replace('```json', "").replace('```', "")
        response  = response.rstrip(' \t\n\r').lstrip(' \t\n\r')
        jsonResponse = JsonResponse({"response": response})
        return jsonResponse
    except Exception as e:
        print("Error generating routine:", str(e))
        return JsonResponse({"error": "Failed to generate routine. Please try again."}, status=HTTPStatus.INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def save_routine(request):

    user = request.user
    if not user.is_authenticated:
        return JsonResponse({"error": "Authentication required."}, status=HTTPStatus.UNAUTHORIZED)

    data = request.data
    if not isinstance(data, dict):
        return JsonResponse({"error": "Invalid JSON format"}, status=HTTPStatus.BAD_REQUEST)

    try:
        # Create a named routine for the user
        routine = Routine.objects.create(user=user, name="My Routine")

        for time_of_day, products in data.items():
            if time_of_day not in ["day", "night"]:
                return JsonResponse({"error": f"Invalid routine time: {time_of_day}"}, status=HTTPStatus.BAD_REQUEST)

            for step in products:
                product_name = step.get("name")
                price = step.get("price")
                step_number = step.get("step")
                instructions = step.get("application", "N/A")

                if not product_name or not step_number:
                    return JsonResponse({"error": "Missing required product details."}, status=HTTPStatus.BAD_REQUEST)

                # Fetch or create product
                product, _ = Product.objects.get_or_create(name=product_name, defaults={"price": price})

                # Create RoutineProduct step
                RoutineProduct.objects.create(
                    routine=routine,
                    product=product,
                    step_number=step_number,
                    instructions=instructions,
                    time_of_day=time_of_day
                )

        return JsonResponse({"message": "Routine saved successfully!"}, status=HTTPStatus.CREATED)

    except Exception as e:
        print("Error saving routine:", str(e))
        return JsonResponse({"error": "Failed to save routine. Please try again."}, status=HTTPStatus.INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def get_routine(request):

    user = request.user  # Get the authenticated user
    if not user.is_authenticated:
        return JsonResponse({"error": "Authentication required."}, status=HTTPStatus.UNAUTHORIZED)

    routines = Routine.objects.filter(user=user)
    routine_list = []

    for routine in routines:
        routine_data = {
            "name": routine.name,
            "created_at": routine.created_at.strftime("%B %d, %Y"),
            "day": [],
            "night": [],
        }

        routine_products = RoutineProduct.objects.filter(routine=routine)

        for rp in routine_products:
            product_data = {
                "step": rp.step_number,  # Use step_number for proper ordering
                "name": rp.product.name,
                "price": str(rp.product.price),  # Convert Decimal to string
                "application": rp.instructions,
            }
            if rp.time_of_day == "day":
                routine_data["day"].append(product_data)
            else:
                routine_data["night"].append(product_data)

        # Sort steps properly within each routine time
        routine_data["day"].sort(key=lambda x: x["step"])
        routine_data["night"].sort(key=lambda x: x["step"])

        routine_list.append(routine_data)

    return JsonResponse({"response": routine_list}, safe=False)