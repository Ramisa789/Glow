from django.apps import AppConfig

class ApiConfig(AppConfig):
    # Default auto field for primary keys. 
    # Using 'BigAutoField' to automatically generate large integer primary keys for models.

    default_auto_field = 'django.db.models.BigAutoField'
    
    name = 'api'  # The name of the application within the Django project.
