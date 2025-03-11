from django.db import models
from django.conf import settings

class Product(models.Model):
    name = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.name} - ${self.price}"

class Routine(models.Model):
    """ A routine that groups a user's day and night skincare regimen """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)  # Allow users to name their routines
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.user.username})"

class RoutineProduct(models.Model):
    """ Represents a single product application step within a routine (day or night) """
    routine = models.ForeignKey(Routine, on_delete=models.CASCADE, related_name="steps")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    step_number = models.PositiveIntegerField()  # Order of application
    instructions = models.TextField(default="N/A")
    time_of_day = models.CharField(max_length=5, choices=[('day', 'Day'), ('night', 'Night')])

    class Meta:
        unique_together = ('routine', 'step_number', 'time_of_day')  # Prevent duplicate step numbers per routine/time_of_day
        ordering = ['time_of_day', 'step_number']  # Ensure steps are retrieved in correct order

    def __str__(self):
        return f"{self.routine.name} - {self.get_time_of_day_display()} Step {self.step_number}: {self.product.name}"
