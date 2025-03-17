from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import authentication_classes, permission_classes
import google.generativeai as genai
from django.conf import settings
import json
from api.models import Product, Routine, RoutineProduct
from decimal import Decimal
from http import HTTPStatus

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
    # Construct the prompt for Gemini based on form data  
    prompt = '''  
    Based on the user's selections, generate a personalized skincare routine.  

    ### User Selections:
    - Skin Type: {skin_type}
    - Routine Type: {routine_type}
    - Skin Concerns: {skin_concerns}
    - Product Criteria: {product_criteria}
    - Allergies: {allergies}
    - Skin Conditions: {skin_conditions}
    - Budget: {budget}
    - Price Range: {min_price} - {max_price}
    '''.format(skin_type = formData["skin_type"], routine_type = formData["routine_type"], skin_concerns = formData["skin_concerns"], product_criteria = formData["product_criteria"], allergies = formData["allergies"], skin_conditions = formData["skin_conditions"], budget = formData["budget"],  min_price = formData["min_price"], max_price = formData["max_price"])
    
    prompt += '''### Expected JSON Format:  
    Return the routine **strictly** in this format:  
    {
    "day": [
        {
        "step": 1,
        "name": "Prudct name",
        "price": "$17.99",
        "application": "steps on how to apply"
        },
        {
        "step": 2,
        "name": "Product name",
        "price": "$25.00",
        "application": "steps on how to apply"
        },
        {
        "step": 3,
        "name": "Product name",
        "price": "$6.00",
        "application": "steps on how to apply"
        }
    ],
    "night": [
        {
        "step": 1,
        "name": "Product name",
        "price": "$17.99",
        "application": "steps on how to apply"
        },
        {
        "step": 2,
        "name": "Product name",
        "price": "$25.00",
        "application": "steps on how to apply"
        },
        {
        "step": 3,
        "name": "The Ordinary Niacinamide 10% + Zinc 1%",
        "price": "$6.00",
        "application": "steps on how to apply"
        }
    ]
    }

    ### Constraints:  
    - **Follow the exact JSON structure** provided above.  
    - **Use the same field names** ("day routine" and "night routine") with lowercase keys.  
    - Each routine must be an **array of objects** with: "step", "name", "price", and "application".
    - If the routine type is only "Day", return an empty array for "night routine" and vice versa. If the routine type is both, provide for both day and night.
    - Do **not** include any extra text, explanations, or formatting outside the JSON response.  
    - The string held in the application field currently with placeholder "steps on how to apply" should be no longer than 400 characters.
    - Do **not** include dollar signs on any price fields.
    '''

    return prompt

genai.configure(api_key=settings.GEMINI_API_KEY)

@api_view(['POST'])
@authentication_classes([])  # Allow unauthenticated access
@permission_classes([])  # No permission restrictions
def generate_response(request):
    print("debugging print statment for this url")
    model = genai.GenerativeModel("gemini-2.0-flash")
    try:
        query = generate_query(request.data['formData'])
        response = model.generate_content(query)
        # Extract actual JSON from response (removing triple backticks)
        jsonResponse = str(response.text).replace('```json', "").replace('```', "")
        jsonResponse  = jsonResponse.rstrip(' \t\n\r').lstrip(' \t\n\r')
    except Exception as e:
        print("Error saving routine:", str(e))
        return JsonResponse({"error": "Failed to save routine. Please try again."}, status=HTTPStatus.INTERNAL_SERVER_ERROR)

    return JsonResponse({"response": jsonResponse})

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
    print("Debugging: Save Routine endpoint hit.")

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