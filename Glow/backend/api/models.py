from django.db import models
from django.conf import settings

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name + " - " + self.price 
    
class Routine(models.Model):
    products = models.ManyToManyField(Product, through='RoutineProduct')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    time_of_day = models.CharField(max_length=5, choices=[('day', 'Day'), ('night', 'Night')])

class RoutineProduct(models.Model):
    routine = models.ForeignKey(Routine, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    instructions = models.CharField(max_length=400, null=False, default="N/A")