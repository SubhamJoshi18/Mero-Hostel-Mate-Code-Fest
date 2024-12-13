import { Application } from 'express';

export const mainRouter = async (expressApplication: Application) => {
  expressApplication.get('/test', () => {
    console.log('testing');
  });
};
