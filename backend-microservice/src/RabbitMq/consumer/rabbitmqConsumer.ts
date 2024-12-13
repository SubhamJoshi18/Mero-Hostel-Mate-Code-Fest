import * as amqp from 'amqplib';
import { queueConfig } from '../../config/rabbitmqConfig';

class RabbitMqConsumer {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;
  private url = queueConfig;

  async connect(): Promise<void> {
    this.connection = await amqp.connect(this.url);
    this.channel = await this.connection.createChannel();
  }

  async consume(
    queue: string,
    onMessage: (msg: amqp.ConsumeMessage | null) => void
  ): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel is not initialized. Call connect() first.');
    }

    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, onMessage, { noAck: true });
  }

  async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }

  consumeMessage(msg: amqp.ConsumeMessage | null): void {
    if (msg) {
      console.log('Received message:', msg.content.toString());
    }
  }
}

export default RabbitMqConsumer;
