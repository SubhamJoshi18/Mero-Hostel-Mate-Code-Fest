import { Request, Response, NextFunction } from 'express';
import { HttpExceptions } from '../exceptions';
import { errorLogger } from '../logger/logger';

/**
 * Handles errors that occur during the execution of a request.
 *
 * @param error - The error that occurred.
 * @param _req - The request object.
 * @param res - The response object.
 * @param _next - The next function.
 * @returns The response with an appropriate error message and status code.
 */
export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof HttpExceptions) {
    // If handled error with status code and message was sent from APIs, send them in payload.
    return res.status(error.getStatusCode()).json({
      message: error.getMessage(),
    });
  }

  //Log Console
  errorLogger.error('Unhandled Error found. Error: ' + error);

  // Unhandled errors
  return res.status(500).json({
    message: 'Unhandle Error Found',
  });
};
