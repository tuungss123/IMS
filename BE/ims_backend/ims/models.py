from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Item(models.Model):
    item_name = models.CharField(max_length=64)
    stock = models.IntegerField()
    price = models.DecimalField(decimal_places=2, max_digits=10)
    calories = models.IntegerField()
    fat = models.IntegerField()
    carbs = models.IntegerField()
    protein = models.IntegerField()

    def __str__(self):
        return f'{self.item_name}'
    

class Transaction(models.Model):
    transacted_item = models.ForeignKey(Item, on_delete=models.CASCADE)
    transacted_amount = models.IntegerField()
    transactor = models.CharField(max_length=64)
    date_created = models.DateTimeField(auto_now_add=True)
    date_changed = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.date_created} - {self.transacted_item} x {self.transacted_amount}'