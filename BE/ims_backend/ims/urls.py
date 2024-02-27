from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login, name='login'),

    # ITEM ENDPOINTS
    path('all_items', views.retrieve_all_items, name='retrieve_items'),
    path('retrieve_item/<int:item_id>', views.retrieve_item, name='retrieve_item'),
    path('create_item', views.create_item, name='create_item'),
    path('search_items', views.search_items, name='search_items'),
    path('update_item/<int:item_id>', views.update_item, name='update_item'),
    path('delete_item/<int:item_id>', views.delete_item, name='delete_item'),
    path('request_item/<int:item_id>', views.request_item, name='request_item'),
    path('retrieve_cafe_critical', views.retrieve_cafe_critical, name='retrieve_cafe_critical'),
    path('retrieve_commissary_critical', views.retrieve_commissary_critical, name='retrieve_commissary_critical'),

    # TRANSACTION ENDPOINTS
    path('all_transactions', views.retrieve_all_transactions, name='retrieve_transactions'),
    path('retrieve_transaction/<int:transaction_id>', views.retrieve_transaction, name='retrieve_transaction'),
    path('update_transaction/<int:transaction_id>', views.update_transaction, name='update_transaction'),
    path('delete_transaction/<int:transaction_id>', views.delete_transaction, name='delete_transaction'),
    path('process_transaction/<int:transaction_id>', views.process_transaction, name='process_transaction'),
    path('retrieve_transaction_summary', views.retrieve_transaction_summary, name='retrieve_transaction_summary'),
    path('search_transfer_requests', views.search_transfer_requests, name='search_transfer_requests'),

    # SPOILAGE ENDPOINTS
    path('retrieve_spoilage_reports', views.retrieve_spoilage_reports, name='retrieve_spoilage_reports'),
    path('report_spoiled/<int:item_id>', views.report_spoiled, name='report_spoiled'),
    path('search_spoilage_reports', views.search_spoilage_reports, name='search_spoilage_reports')
]