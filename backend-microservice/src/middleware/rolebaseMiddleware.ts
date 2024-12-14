import { Request, Response, NextFunction } from 'express';

export const checkIsAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.user);
  if (req.user.role.includes('owner')) {
    next();
  } else {
    return res.status(404).json({
      message: `User is not an owner`,
    });
  }
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
