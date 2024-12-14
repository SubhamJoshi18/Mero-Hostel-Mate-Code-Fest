import { Router } from 'express';
import ChatbotController from '../controller/chatbot.controller';
const chatbotRouter = Router();

chatbotRouter.post('/chatbot', ChatbotController.sendResponse as any);

export default chatbotRouter;
