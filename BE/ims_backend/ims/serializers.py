from rest_framework import serializers
from .models import Item, Transaction

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = [
            'id',
            'item_name',
            'commissary_stock',
            'cafe_stock',
        ]


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = [
            'id',
            'transacted_item',
            'transacted_amount',
            'transactor',
            'date_created',
            'date_changed'
        ]