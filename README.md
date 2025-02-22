# Devlopment Setup (backend connection)

Use this website to help get started: https://stackpython.medium.com/how-to-start-django-project-with-a-database-postgresql-aaa1d74659d8

Tip: you need postgres 12+

## Step 1: Set Up Virtual Environment

Create and activate a virtual environment:

Windows:
```bash
python -m venv venv
```
```bash
.\venv\Scripts\activate
```

Mac:
```bash
python3 -m venv venv
```
```bash
source venv/bin/activate
```

Install the required dependencies:

```bash
pip install django psycopg2 django-cors-headers
pip install google-generativeai
pip install djangorestframework
```

## Step 2: Setup Environment Variables
Make sure you have `dot-env` installed:
```bash
pip install python-dotenv
```
In the `Glow` folder, create a new file called `.env` and format it like this:

```
DB_NAME=your_db_name 
DB_USER=your_user_name
DB_PASSWORD=your_password
DB_HOST=your_host
DB_PORT=your_port_number
DJANGO_KEY=secret_key
GEMINI_API_KEY=your_gemini_api_key

```
This is already included in the `.gitignore` but double check that you won't commit it to the repository. These environment variables will then be used by `backend/config/settings.py` to get you connected to your database and Gemini.

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.getenv('DB_NAME'),  
        'USER': os.getenv('DB_USER', 'postgres'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST', '127.0.0.1'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}
```

## Step 3: CORS Settings

In `config/settings.py`
Make sure your frontend server port matches the allowed orgins to it can make requests.

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
```

## Step 4: Migrate Database

Run migrations to set up the database:

```bash
python manage.py migrate
```

## Step 5. Running the Full Application

1. Start the Django backend:

```bash
python manage.py runserver
```

2. In a separate terminal, start the React frontend:

```bash
npm start
```

You should see "Hello from Django!" displayed on the React frontend.
