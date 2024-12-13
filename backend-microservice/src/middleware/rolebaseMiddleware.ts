import { Request, Response, NextFunction } from 'express';

export const checkIsAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role.includes('owner')) {
    next();
  }
  return res.status(404).json({
    message: `User is not an owner`,
  });
};

export const checkIsUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role.includes('user')) {
    next();
  }
  return res.status(404).json({
    message: `User is not an owner`,
  });
};
