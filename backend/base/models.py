from django.db import models
from django.contrib.auth.models import User
# Create your models here.

def upload_path(instance, filename):
    return 'images/{filename}'.format(filename=filename)
    
class Plant(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=150)
    date_added = models.DateField(auto_now_add=True)
    description = models.TextField()
    img = models.ImageField(blank=True, null=True, upload_to=upload_path)
    plant_species = models.CharField(max_length=150)
    last_watered = models.IntegerField(default=0)
    how_often = models.IntegerField(default=0)
    tracked=models.BooleanField(default=True)