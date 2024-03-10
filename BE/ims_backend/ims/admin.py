from django.contrib import admin
from .models import Item, Transaction, SpoiledMaterialReport, Notification

# Register your models here.
admin.site.register(Item)
admin.site.register(SpoiledMaterialReport)
admin.site.register(Notification)


class TransactionAdmin(admin.ModelAdmin):
    list_display = ('transacted_item', 'transacted_amount', 'transactor', 'admin_approval')
    list_filter = ('transacted_item', 'transactor', 'admin_approval')

admin.site.register(Transaction, TransactionAdmin)