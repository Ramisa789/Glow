from django.apps import AppConfig


class TestDatabaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'test_database'
