import { GoogleGenerativeAI } from '@google/generative-ai';
import { getEnv } from '../utils/getEnv';

class GenAiSevices {
  public connectToModel = () => {
    const genAI = new GoogleGenerativeAI(getEnv('GEMINI_API_KEY') as string);
    const model = genAI.getGenerativeModel({
      model: 'gemini-pro',
    });
    return model;
  };

  public translateToNepali = async (text: string) => {
    const prompt = `Translate the following English text to Nepali: ${text}`;
    const response = await this.connectToModel().generateContent(prompt);
    const reply = response.response.text();
    return reply;
  };

  
  public chatbotResponse = async (userMessage: string) => {
    const prompt = `You are a helpful assistant. Respond to the following user message: "${userMessage}"`;
    const response = await this.connectToModel().generateContent(prompt);
    const reply = response.response.text();
    return reply;
  };
}

export default GenAiSevices;
