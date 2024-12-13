import * as amqp from 'amqplib';
import { queueConfig } from '../../config/rabbitmqConfig';

class RabbitMqProducer {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;
  private url = queueConfig;

  async connect(): Promise<void> {
    this.connection = await amqp.connect(this.url);
    this.channel = await this.connection.createChannel();
  }

  async produce(queue: string, message: any): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel is not initialized. Call connect() first.');
    }

    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
  }

  async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }
}

export default RabbitMqProducer;
