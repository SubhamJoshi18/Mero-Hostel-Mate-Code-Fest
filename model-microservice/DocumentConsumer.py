from rabbitmq.consumer.rabbitmqConsumer import RabbitMqConsumer
from config.rabbitmqConfig import document_rabbitmq
from handlers.documentVerificationHandler import handle_document_verification


def consume_message(ch, method, properties, body):
    decoded_body =  body.decode()
    try:
        result = handle_document_verification(decoded_body)
        return result
    except Exception as error:
        print(f'Error handling The Consumer Message For Documentation')

    
if __name__ == '__main__':
    consumer = RabbitMqConsumer('amqp://localhost')
    consumer.connect()
    consumer.consume(document_rabbitmq['queue_name'],consume_message )
    print("Starting to consume messages...")
    consumer.start_consuming()