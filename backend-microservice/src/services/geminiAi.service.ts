import { GoogleGenerativeAI } from '@google/generative-ai';
import { getEnv } from '../utils/getEnv';

class GenAiSevices {
  public static connectToModel = () => {
    const genAI = new GoogleGenerativeAI(getEnv('GEMINI_API_KEY') as string);
    const model = genAI.getGenerativeModel({
      model: 'gemini-pro',
    });
    return model;
  };

  public static translateToNepali = async (text: string) => {
    const prompt = `Translate the following English text to Nepali: ${text}`;
    const response = await this.connectToModel().generateContent(prompt);
    const reply = response.response.text();
    return reply;
  };
}

export default GenAiSevices;
