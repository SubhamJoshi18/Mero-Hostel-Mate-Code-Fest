import pika
import json

class RabbitMqProducer:
    def __init__(self, url: str):
        self.url = url
        self.connection = None
        self.channel = None

    def connect(self):
        self.connection = pika.BlockingConnection(pika.URLParameters(self.url))
        self.channel = self.connection.channel()

    def produce(self, queue: str, message: dict):
        if not self.channel:
            raise Exception('Channel is not initialized. Call connect() first.')

        self.channel.queue_declare(queue=queue, durable=True)
        self.channel.basic_publish(
            exchange='',
            routing_key=queue,
            body=json.dumps(message),
            properties=pika.BasicProperties(
                delivery_mode=2, 
            )
        )

    def close(self):
        if self.channel:
            self.channel.close()
        if self.connection:
            self.connection.close()

