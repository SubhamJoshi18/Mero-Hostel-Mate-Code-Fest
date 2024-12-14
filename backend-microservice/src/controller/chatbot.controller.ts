import type, { NextFunction, Request, Response } from 'express';
import GenAiSevices from '../services/geminiAi.service';

class ChatbotController {
  private genAiService: GenAiSevices | null = null;

  constructor() {
    this.genAiService = new GenAiSevices();
    this.genAiService.connectToModel();
  }

  public async sendResponse(req: Request, res: Response, next: NextFunction) {
    try {
      const { message } = req.body;
      const respond = await this.genAiService?.chatbotResponse(message);
      console.log('respond', respond);
      return res.status(201).json({
        message: 'Chatbot response',
        respond,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new ChatbotController();
