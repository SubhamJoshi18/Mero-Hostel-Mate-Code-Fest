import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getEnv } from '../utils/getEnv';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const verifyAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userToken = req.headers['authorization'] ?? req.headers.authorization;

    if (!userToken) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
    console.log(userToken);

    const token = userToken.startsWith('Bearer ')
      ? userToken.slice(7)
      : userToken;

    jwt.verify(
      token,
      getEnv('ACCESS_TOKEN_SECRET') as string,
      (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: 'Unauthorized',
          });
        }

        req.user = decoded;
        next();
      }
    );
  } catch (err) {
    next(err);
  }
};

export const checkBookMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.path);
  if (req.path.includes('/book/hostel')) {
    const userToken = req.headers['authorization'] ?? req.headers.authorization;
    if (!userToken) {
      return res.status(401).json({
        message: 'Please Login First To Book The Hostel',
      });
    }
    next();
  }
};
