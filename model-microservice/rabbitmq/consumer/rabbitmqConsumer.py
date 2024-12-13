import pika

class RabbitMqConsumer:
    def __init__(self, url: str):
        self.url = url
        self.connection = None
        self.channel = None

    def connect(self):
        self.connection = pika.BlockingConnection(pika.URLParameters(self.url))
        self.channel = self.connection.channel()

    def consume(self, queue: str, on_message_callback):
        if not self.channel:
            raise Exception('Channel is not initialized. Call connect() first.')

        self.channel.queue_declare(queue=queue, durable=True)
        self.channel.basic_consume(queue=queue, on_message_callback=on_message_callback, auto_ack=True)

    def start_consuming(self):
        if not self.channel:
            raise Exception('Channel is not initialized. Call connect() first.')

        self.channel.start_consuming()

    def close(self):
        if self.channel:
            self.channel.close()
        if self.connection:
            self.connection.close()


