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


# ITEMS ENDPOINTS
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
    commissary_stock = request.POST.get('commissary_stock')
    cafe_stock = request.POST.get('cafe_stock')

    try:
        new_item = Item(
            item_name=item_name,
            commissary_stock=commissary_stock,
            cafe_stock=cafe_stock
        )
        new_item.save()

        return Response({'response': 'Item Created'}, 200)
    except:
        return Response({'response': 'Failed to Create Item'}, 200)
    

@api_view(['POST'])
def update_item(request, item_id):
    item_name = request.POST.get('item_name')
    commissary_stock = request.POST.get('commissary_stock')
    cafe_stock = request.POST.get('cafe_stock')

    try:
        item = Item.objects.get(id=item_id)
        item.item_name = item_name
        item.commissary_stock = commissary_stock
        item.cafe_stock = cafe_stock
        item.save()

        return Response({'response': 'Item Updated'}, 200)
    except:
        return Response({'response': 'Failed to Update Item'}, 200)


@api_view(['POST'])
def request_item(request, item_id):
    request_quantity = int(request.POST.get('request_quantity'))

    try:
        item = Item.objects.get(id=item_id)
        
        if item.commissary_stock >= request_quantity:
            item.commissary_stock -= request_quantity

            return Response({'response': 'Request Successful'}, 200)
        else:
            return Response({'response': 'Request Failed. Stock Insufficient'}, 400)
    except:
        return Response({'response': 'Failed to Create Item Request'}, 200)


@api_view(['POST'])
def delete_item(request, item_id):
    try:
        item = Item.objects.get(id=item_id)
        item.delete()

        return Response({'response': 'Item Deleted'}, 200)
    except:
        return Response({'response': 'Failed to Delete Item'}, 200)
    

# TRANSACTIONS ENDPOINTS
@api_view(['GET'])
def retrieve_all_transactions(request):
    if request.method == 'GET':
        all_transactions = Transaction.objects.all()
        serialize_transactions = TransactionSerializer(all_transactions, many=True)

        return Response({'transactions': serialize_transactions.data}, 200)
    

@api_view(['GET'])
def retrieve_transaction(request, transaction_id):
    if request.method == 'GET':
        transaction = Transaction.objects.filter(id=transaction_id)
        serialize_transaction = TransactionSerializer(transaction, many=False)

        return Response({'transaction': serialize_transaction.data}, 200)


@api_view(['POST'])
def create_transaction(request):
    transacted_item = request.POST.get('transacted_item')
    transacted_amount = request.POST.get('transacted_amount')
    transactor = request.POST.get('transactor')
    date_created = request.POST.get('date_created')
    date_changed = request.POST.get('date_changed')

    try:
        new_transaction = Transaction(
            transacted_item = transacted_item,
            transacted_amount = transacted_amount,
            transactor = transactor,
            date_created = date_created,
            date_changed = date_changed
        )
        new_transaction.save()

        return Response({'response': 'Transaction Created'}, 200)
    except:
        return Response({'response': 'Failed to Create Item'}, 200)
    

@api_view(['POST'])
def update_transaction(request, transaction_id):
    transacted_item = request.POST.get('transacted_item')
    transacted_amount = request.POST.get('transacted_amount')
    transactor = request.POST.get('transactor')
    date_created = request.POST.get('date_created')
    date_changed = request.POST.get('date_changed')

    try:
        transaction = Transaction.objects.get(id=transaction_id)
        transaction.transacted_item = transacted_item,
        transaction.transacted_amount = transacted_amount
        transaction.transactor = transactor
        transaction.date_created = date_created
        transaction.date_changed = date_changed
        transaction.save()

        return Response({'response': 'Transaction Updated'}, 200)
    except:
        return Response({'response': 'Failed to Update Transaction'}, 200)
    

@api_view(['POST'])
def delete_transaction(request, transaction_id):
    try:
        transaction = Item.objects.get(id=transaction_id)
        transaction.delete()

        return Response({'response': 'Transaction Deleted'}, 200)
    except:
        return Response({'response': 'Failed to Delete Transaction'}, 200)