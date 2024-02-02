from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),

    # ITEM ENDPOINTS
    path('all_items', views.retrieve_all_items, name='retrieve_items'),
    path('retrieve_item/<int:item_id>', views.retrieve_item, name='retrieve_item'),
    path('update_item/<int:item_id>', views.update_item, name='update_item'),
    path('delete_item/<int:item_id>', views.delete_item, name='delete_item'),

    # TRANSACTION ENDPOINTS
    path('all_transactions', views.retrieve_all_transactions, name='retrieve_transactions'),
    path('retrieve_transaction/<int:transaction_id>', views.retrieve_transaction, name='retrieve_transaction'),
    path('update_transaction/<int:transaction_id>', views.update_transaction, name='update_transaction'),
    path('delete_transaction/<int:transaction_id>', views.delete_transaction, name='delete_transaction'),
]