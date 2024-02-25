from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from .models import Item, Transaction, SpoiledMaterialReport
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.utils import timezone
from .serializers import ItemSerializer, TransactionSerializer, SpoiledMaterialReportSerializer
from datetime import datetime
from openpyxl import Workbook


# Create your views here.
def index(request):
    return HttpResponse('Test works...')


# LOGIN ENDPOINTS
@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            user = User.objects.get(username=username)

            if user is not None:
                if user.check_password(password):
                    return Response({'response': 'Login successful', 'user_data': user.username })
                else:
                    return Response({'response': 'Invalid credentials'}, status=401)
            else:
                return Response({'response': 'Invalid credentials'}, status=401)
        except:
            return Response({'response': 'Invalid credentials'}, status=401)
        

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
def search_items(request):
    if request.method == 'POST':
        search = request.data.get('search')

        items = Item.objects.filter(item_name__icontains=f'{search}')
        serialize_items = ItemSerializer(items, many=True)

        return Response({'items': serialize_items.data}, 200)


@api_view(['POST'])
def create_item(request):
    item_name = request.data.get('item_name')
    commissary_stock = request.data.get('commissary_stock')

    try:
        item = Item.objects.filter(item_name=item_name).first()

        if item is None:
            new_item = Item(
                item_name=item_name,
                commissary_stock=commissary_stock,
                cafe_stock=0
            )

            new_item.save()
            return Response({'response': 'Item Created'}, 200)
        
        else:
            return Response({'response': 'Item Already Exists'}, 200)
        
    except Exception as e:
        return Response({'response': 'Failed to Create Item'}, 400)

    

@api_view(['POST'])
def update_item(request, item_id):
    stock_update = int(request.data.get('stock_update'))

    try:
        item = Item.objects.get(id=item_id)
        item.commissary_stock += stock_update
        item.save()

        return Response({'response': 'Item Updated'}, 200)
    except:
        return Response({'response': 'Failed to Update Item'}, 200)


@api_view(['POST'])
def request_item(request, item_id):
    request_quantity = int(request.data.get('request_quantity'))
    transactor = request.data.get('transactor')

    try:
        requested_id = Item.objects.get(id=item_id)

        if transactor == 'Cafe':
            new_transaction = Transaction(
                transacted_item= requested_id,
                transacted_amount= request_quantity,
                transactor= transactor,
                admin_approval=True
            )
        else:
            new_transaction = Transaction(
                transacted_item= requested_id,
                transacted_amount= request_quantity,
                transactor= transactor
            )

        new_transaction.save()
        return Response({'response': 'Request Made.'}, 200)
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
    

@api_view(['POST'])
def search_transfer_requests(request):
    if request.method == 'POST':
        search = request.data.get('search')

        transactions = Transaction.objects.filter(transacted_item__item_name__icontains=f'{search}')
        serialize_transactions = TransactionSerializer(transactions, many=True)

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
    transacted_amount = request.data.get('transacted_amount')

    # try:
    transaction = Transaction.objects.get(id=transaction_id)
    transaction.transacted_amount = transacted_amount
    transaction.save()

    return Response({'response': 'Transaction Updated'}, 200)
    # except:
    #     return Response({'response': 'Failed to Update Transaction'}, 200)
    

@api_view(['DELETE'])
def delete_transaction(request, transaction_id):
    try:
        transaction = Transaction.objects.get(id=transaction_id)
        transaction.delete()

        return Response({'response': 'Transaction Deleted'}, 200)
    except:
        return Response({'response': 'Failed to Delete Transaction'}, 200)
    

@api_view(['POST'])
def process_transaction(request, transaction_id):
    try:
        action = request.data.get('action')

        retrieved_transaction = Transaction.objects.get(id=transaction_id)
        item = Item.objects.get(id=retrieved_transaction.transacted_item.id)
        
        # HANDLE INTERN REQUEST
        if retrieved_transaction.transactor == 'Intern':
            if retrieved_transaction.admin_approval:

                if action == 'Approved':
                    if item.commissary_stock >= retrieved_transaction.transacted_amount:
                        item.commissary_stock -= retrieved_transaction.transacted_amount
                        item.cafe_stock += retrieved_transaction.transacted_amount
                    
                        retrieved_transaction.approval = 'Approved'
                        message = f"""
                            {retrieved_transaction.date_changed.strftime("%m/%d/%Y %I:%M %p")} - Approved {retrieved_transaction.transactor}'s request to transfer item: 
                            {item.item_name} * {retrieved_transaction.transacted_amount}
                        """
                    
                    else:
                        return Response({'response': 'Request Failed. Stock Insufficient'}, 400)
                    
                elif action == 'Denied':
                        retrieved_transaction.approval = 'Denied'
                        message = f"""
                            {retrieved_transaction.date_changed.strftime("%m/%d/%Y %I:%M %p")} - Denied {retrieved_transaction.transactor}'s request to transfer item: 
                            {item.item_name} * {retrieved_transaction.transacted_amount}
                        """

                retrieved_transaction.save()
                item.save()
                return Response({'response': message}, 200)
            else:
                return Response({'response': 'Transaction was not approved by the Administrator.'}, 400)
            
        else:
            if action == 'Approved':
                if item.commissary_stock >= retrieved_transaction.transacted_amount:
                    item.commissary_stock -= retrieved_transaction.transacted_amount
                    item.cafe_stock += retrieved_transaction.transacted_amount
                    
                    
                    retrieved_transaction.approval = 'Approved'
                    message = f"""
                        {retrieved_transaction.date_changed.strftime("%m/%d/%Y %I:%M %p")} - Approved {retrieved_transaction.transactor}'s request to transfer item: 
                        {item.item_name} * {retrieved_transaction.transacted_amount}
                    """

                else:
                    return Response({'response': 'Request Failed. Stock Insufficient'}, 400)
            
            elif action == 'Denied':
                retrieved_transaction.approval = 'Denied'
                message = f"""
                    {retrieved_transaction.date_changed.strftime("%m/%d/%Y %I:%M %p")} - Denied {retrieved_transaction.transactor}'s request to transfer item: 
                    {item.item_name} * {retrieved_transaction.transacted_amount}
                """

            retrieved_transaction.save()
            item.save()
            return Response({'response': message}, 200)
    except:
        return Response({'response': 'Failed to Process Item Request'}, 200)
    

@api_view(['POST'])
def retrieve_transaction_summary(request):
    if request.method == 'POST':
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')

        try:
            start_date = datetime.strptime(start_date, '%Y-%m-%d')
            end_date = datetime.strptime(end_date, '%Y-%m-%d')

        except ValueError:
            return Response({'response': 'Invalid date format. Please use YYYY-MM-DD.'}, status=400)

        # Assuming Transaction has a date_created field
        transactions = Transaction.objects.filter(date_created__range=[start_date, end_date])

        wb = Workbook()
        ws = wb.active
        ws.append(['Item', 'Amount', 'Transaction Status', 'Transactor', 'Date Transacted'])  # Add headers

        for transaction in transactions:
            print(transaction)
            print(transaction.transacted_amount)
            print(transaction.approval)
            print(transaction.transactor)
            print(transaction.date_created)

            date_created = transaction.date_created.strftime('%Y-%m-%d %H:%M:%S')
            ws.append([transaction.transacted_item.item_name, transaction.transacted_amount, transaction.approval, transaction.transactor, date_created])

        # Save the Excel file
        excel_filename = f'transactions.xlsx'
        wb.save(excel_filename)

        # Prepare the response to return the Excel file for download
        with open(excel_filename, 'rb') as excel_file:
            response = HttpResponse(excel_file.read(), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = f'attachment; filename={excel_filename}'
            return response


# SPOILAGE REPORTS ENDPOINTS
@api_view(['GET'])
def retrieve_spoilage_reports(request):
    if request.method == 'GET':
        spoilage_reports = SpoiledMaterialReport.objects.all()
        serialize_spoilage_reports = SpoiledMaterialReportSerializer(spoilage_reports, many=True)

        return Response({'spoilage_reports': serialize_spoilage_reports.data}, 200)


@api_view(['POST'])
def report_spoiled(request, item_id):
    spoil_amount = int(request.data.get('spoil_amount'))
    report_creator = request.data.get('report_creator')

    try:
        spoiled_item = Item.objects.get(id=item_id)

        if spoil_amount <= spoiled_item.cafe_stock:
            new_spoil_report = SpoiledMaterialReport(
                item=spoiled_item,
                spoil_amount=spoil_amount,
                report_creator=report_creator
            )
            new_spoil_report.save()

            spoiled_item.cafe_stock -= spoil_amount
            spoiled_item.save()

            return Response({'response': 'Spoil Report Created'}, 200)
        else:
            return Response({'response': 'Invalid Spoil Report'}, 200)
    except:
        return Response({'response': 'Failed to Create Spoil Report'}, 200)
    

@api_view(['POST'])
def search_spoilage_reports(request):
    if request.method == 'POST':
        search = request.data.get('search')

        reports = SpoiledMaterialReport.objects.filter(item__item_name__icontains=f'{search}')
        serialize_reports = SpoiledMaterialReportSerializer(reports, many=True)

        return Response({'reports': serialize_reports.data}, 200)