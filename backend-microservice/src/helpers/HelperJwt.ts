import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getEnv } from '../utils/getEnv';

export class HelperJsonWebToken {
  public async generateSalt() {
    return await bcrypt.genSalt(10);
  }

  public async hashPassword(password: string, salt: string) {
    return await bcrypt.hash(password, salt);
  }

  public async ComparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
  public async createAccessToken(payload: any) {
    return jwt.sign(payload, getEnv('ACCESS_TOKEN_SECRET') as string, {
      expiresIn: '1y', // Set expiration to 1 year
    });
  }
}
