import type, { Request, Response } from 'express';
import { Application } from 'express';
import authRouter from './auth.route';
import documentRouter from './document.route';
import { errorHandler } from '../middleware/errorMiddleware';

export const mainRouter = async (expressApplication: Application) => {
  expressApplication.use('/api', [authRouter, documentRouter]);

  expressApplication.use('*', (req: Request, res: Response): any => {
    return res.status(40).json({
      message: `${req.originalUrl} does not exists`,
    });
  });
  expressApplication.use(errorHandler as any);
};
