import type { Request, Response } from 'express';
import { HttpExceptions } from '../exceptions';
import RabbitMqProducer from '../RabbitMq/producer/rabbitmqProducer';
import DocumentService from '../services/document.service';

class DocumentController {
  verifyandInsertDocument = async (req: Request, res: Response) => {
    try {
      const file = req.file;
      const userId = req.user._id;
      if (!file) {
        throw new HttpExceptions(400, 'Citizenship photo is required');
      }
      const { documentDetails } = req.body;
      const documentData = {
        userId,
        documentDetails,
        photoPath: file.path,
      };

      const response = await DocumentService.verifyAndInsertDocument(
        documentData
      );
      res.status(201).json({
        message: 'Document uploaded successfully',
        document: response,
      });
    } catch (err) {
      console.log(err);
      if (err instanceof HttpExceptions) {
        res.status(err.statusCode).json({ message: err.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  };
}

export default new DocumentController();
