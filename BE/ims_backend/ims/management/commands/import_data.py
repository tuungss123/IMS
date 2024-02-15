# management/commands/import_data.py
from django.core.management.base import BaseCommand
from ims.models import Item

class Command(BaseCommand):
    help = 'Import data from a text file'

    def handle(self, *args, **options):
        with open('data/MATERIALS.txt', 'r') as file:
            for line in file:
                data = Item(
                    item_name=line.strip(),
                    commissary_stock=100,
                    cafe_stock=0,
                )
                data.save()
