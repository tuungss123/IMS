from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Item(models.Model):
    item_name = models.CharField(max_length=64)
    commissary_stock = models.IntegerField()
    cafe_stock = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.item_name}'
    

class Transaction(models.Model):
    transacted_item = models.ForeignKey(Item, on_delete=models.CASCADE)
    transacted_amount = models.IntegerField()
    transactor = models.CharField(max_length=64)
    date_created = models.DateTimeField(auto_now_add=True)
    date_changed = models.DateTimeField(auto_now=True)
    admin_approval = models.BooleanField(default=False)
    approval = models.CharField(default='Pending', max_length=12)

    def __str__(self):
        return f'{self.date_created} - ({self.transactor}) {self.transacted_item} x {self.transacted_amount}'
    

class SpoiledMaterialReport(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    spoil_amount = models.IntegerField()
    report_creator = models.CharField(max_length=64)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.date_created} - {self.item.item_name} x {self.spoil_amount}'