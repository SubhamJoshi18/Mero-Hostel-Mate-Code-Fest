import dotenv from 'dotenv';
dotenv.config();

export const getEnv = (key: string) => {
  if (process.env[key]) {
    return process.env[key];
  }
  return null;
};
