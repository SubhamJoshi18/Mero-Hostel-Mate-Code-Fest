import DocumentController from '../controller/document.controller';
import { IDocumentData } from '../interfaces/document.interface';
import RabbitMqProducer from '../RabbitMq/producer/rabbitmqProducer';
import { docmentQueue } from '../config/rabbitmqConfig';
import axios from 'axios';

class DocumentService {
  private rabbitmqProducer: RabbitMqProducer | null = null;

  constructor() {
    this.rabbitmqProducer = new RabbitMqProducer();
  }

  async verifyAndInsertDocument(data: IDocumentData) {
    const response = await axios.post('/model/yolo', {
      data,
    });
    console.log(response.data);
  }
}

export default new DocumentService();
