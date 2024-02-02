from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse
from .models import Item, Transaction
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ItemSerializer, TransactionSerializer


# Create your views here.
def index(request):
    return HttpResponse('Test works...')


@api_view(['GET'])
def retrieve_all_items(request):
    if request.method == 'GET':
        all_items = Item.objects.all()
        serialize_items = ItemSerializer(all_items, many=True)

        return Response({'items': serialize_items.data}, 200)
    

@api_view(['GET'])
def retrieve_item(request, item_id):
    if request.method == 'GET':
        item = Item.objects.filter(id=item_id)
        serialize_item = ItemSerializer(item, many=False)

        return Response({'item': serialize_item.data}, 200)


@api_view(['POST'])
def create_item(request):
    item_name = request.POST.get('item_name')
    stock = request.POST.get('stock')
    price = request.POST.get('price')

    try:
        new_item = Item(
            item_name=item_name,
            stock=stock,
            price=price,
        )
        new_item.save()

        return Response({'response': 'Item Created'}, 200)
    except:
        return Response({'response': 'Failed to Create Item'}, 200)
    

@api_view(['POST'])
def update_item(request, item_id):
    item_name = request.POST.get('item_name')
    stock = request.POST.get('stock')
    price = request.POST.get('price')

    try:
        item = Item.objects.get(id=item_id)
        item.item_name = item_name
        item.stock = stock
        item.price = price
        item.save()

        return Response({'response': 'Item Updated'}, 200)
    except:
        return Response({'response': 'Failed to Update Item'}, 200)
    

@api_view(['POST'])
def delete_item(request, item_id):
    try:
        item = Item.objects.get(id=item_id)
        item.delete()

        return Response({'response': 'Item Deleted'}, 200)
    except:
        return Response({'response': 'Failed to Delete Item'}, 200)