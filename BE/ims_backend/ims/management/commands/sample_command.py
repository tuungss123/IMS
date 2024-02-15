from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Import data from a text file'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Hello from custom management command!'))
