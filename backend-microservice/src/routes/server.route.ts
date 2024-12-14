import type, { Request, Response } from 'express';
import { Application } from 'express';
import authRouter from './auth.route';
import documentRouter from './document.route';
import { errorHandler } from '../middleware/errorMiddleware';
import userProfileRouter from './userprofile.route';
import hostelRouter from './hostels.route';
import bookingRouter from './booking.route';

export const mainRouter = async (expressApplication: Application) => {
  expressApplication.use('/api', [
    authRouter,
    documentRouter,
    userProfileRouter,
    hostelRouter,
    bookingRouter,
  ]);

  expressApplication.use('*', (req: Request, res: Response): any => {
    return res.status(40).json({
      message: `${req.originalUrl} does not exists`,
    });
  });
  expressApplication.use(errorHandler as any);
};
