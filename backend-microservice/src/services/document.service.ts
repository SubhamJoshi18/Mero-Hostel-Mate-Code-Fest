import DocumentController from '../controller/document.controller';
import { IDocumentData } from '../interfaces/document.interface';
import RabbitMqProducer from '../RabbitMq/producer/rabbitmqProducer';
import { docmentQueue } from '../config/rabbitmqConfig';

class DocumentService {
  private rabbitmqProducer: RabbitMqProducer | null = null;

  constructor() {
    this.rabbitmqProducer = new RabbitMqProducer();
  }

  async verifyAndInsertDocument(data: IDocumentData) {
    await this.rabbitmqProducer?.connect();
    await this.rabbitmqProducer?.produce(docmentQueue, data);
    await this.rabbitmqProducer?.close();
  }
}

export default new DocumentService();
