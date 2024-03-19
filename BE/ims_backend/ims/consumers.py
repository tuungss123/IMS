import json
from channels.generic.websocket import AsyncWebsocketConsumer


class Consumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        
        print(self.user_id)

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        pass