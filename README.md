
### 401practice

# To Connect Django with PostgreSQL

Use this website to help get started: https://stackpython.medium.com/how-to-start-django-project-with-a-database-postgresql-aaa1d74659d8

tip: i skipped the enviornmental variable stuff and u need postgres 12+

## Step 1: Set Up Virtual Environment

Create and activate a virtual environment:

```bash
python -m venv venv
.\venv\Scripts\activate
```

Install the required dependencies:

```bash
pip install django psycopg2 django-cors-headers
```

## Step 2: Start Django Project

Create a new Django project:

```bash
django-admin startproject backend .
```

## Step 3: Configure Database in `backend/settings.py`

In `backend/settings.py`, configure the PostgreSQL database:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_database_name',
        'USER': 'your_database_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## Step 4: Add `corsheaders` to Installed Apps and Middleware

In `backend/settings.py`, add `corsheaders` to the `INSTALLED_APPS` and configure the `MIDDLEWARE`:

```python
INSTALLED_APPS = [
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

Enable CORS and allow the React frontend to make requests:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
```

## Step 5: Migrate Database

Run migrations to set up the database:

```bash
python manage.py migrate
```

## Step 6: Create a Simple API Endpoint

1. Generate a new app:

```bash
python manage.py startapp api
```

2. In `api/views.py`, define the API view:

```python
from django.http import JsonResponse

def hello_world(request):
    return JsonResponse({"message": "Hello from Django!"})
```

3. In `backend/urls.py`, include the API endpoint:

```python
from django.contrib import admin
from django.urls import path
from api.views import hello_world

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/hello/', hello_world),
]
```

4. Run the development server:

```bash
python manage.py runserver
```

---

## 2. Set Up Frontend (React)

### Step 1: Create React App

Create a new React app:

```bash
npx create-react-app frontend
cd frontend
```

### Step 2: Install Axios

Install Axios to handle API requests:

```bash
npm install axios
```

### Step 3: Create Component to Fetch Data

In `src/App.js`, set up the component to fetch data from the Django backend:

```javascript
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/api/hello/")
      .then(response => setMessage(response.data.message))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
```

### Step 4: Start React App

Run the React app:

```bash
npm start
```

---

## 3. Running the Full Application

1. Start the Django backend:

```bash
python manage.py runserver
```

2. In a separate terminal, start the React frontend:

```bash
npm start
```

You should see "Hello from Django!" displayed on the React frontend.
