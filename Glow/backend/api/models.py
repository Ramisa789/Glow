from django.db import models
from django.conf import settings

# Create your models here.

class DefaultFalseBooleanField(models.BooleanField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault('null', False)
        kwargs.setdefault('default', False)
        super().__init__(*args, **kwargs)

class UserSkinConcerns(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, primary_key=True, on_delete=models.CASCADE)
    acne = DefaultFalseBooleanField()
    large_pores = DefaultFalseBooleanField()
    loss_of_firmness = DefaultFalseBooleanField()
    dark_circles = DefaultFalseBooleanField()
    hyper_pigmentation = DefaultFalseBooleanField()
    congested_skin = DefaultFalseBooleanField()
    sun_damange = DefaultFalseBooleanField()
    puffy_eyes = DefaultFalseBooleanField()
    dehydrated = DefaultFalseBooleanField()
    redness = DefaultFalseBooleanField()
    scarring = DefaultFalseBooleanField()
    aging = DefaultFalseBooleanField()
    textured = DefaultFalseBooleanField()
    wrinkles = DefaultFalseBooleanField()
    sensitive = DefaultFalseBooleanField()

class SkinCondition(models.Model):
    user_id = models.ManyToManyField(settings.AUTH_USER_MODEL, through='UserSkinCondition')
    name = models.CharField(max_length= 50, unique=True)

    def __str__(self):
        return self.name

class UserSkinCondition(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    condition = models.ForeignKey(SkinCondition, on_delete=models.CASCADE)

class Allergy(models.Model):
    user_id = models.ManyToManyField(settings.AUTH_USER_MODEL, through='UserAllergy')
    name = models.CharField(max_length= 50, unique=True)

    def __str__(self):
        return self.allergy

class UserAllergy(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    allergy = models.ForeignKey(Allergy, on_delete=models.CASCADE)

class UserIngredientExclusions(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, primary_key=True, on_delete=models.CASCADE)
    fragrance = DefaultFalseBooleanField()
    alcohol = DefaultFalseBooleanField()
    paraben_and_sulfate = DefaultFalseBooleanField()

class UserProductConcerns(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, primary_key=True, on_delete=models.CASCADE)
    cruelty_free = DefaultFalseBooleanField()
    vegan = DefaultFalseBooleanField()
    eco_friendly_packaging = DefaultFalseBooleanField()
    sustainable_sourcing = DefaultFalseBooleanField()

class Product(models.Model):
    name = models.CharField(max_length=100)
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