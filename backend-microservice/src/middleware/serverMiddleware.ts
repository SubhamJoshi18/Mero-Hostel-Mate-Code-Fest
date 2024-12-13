import { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

export const serverMiddleware = async (expressApplication: Application) => {
  expressApplication.use(cors());
  expressApplication.use(morgan('dev'));
};
