import type, { Request, Response, NextFunction } from 'express';
import { HttpExceptions, ValidationException } from '../exceptions';
import { loginValidator, registerUser } from '../validators/joi/user.validator';
import AuthService from '../services/auth.service';

class AuthController {
  registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = req.body;
      if (Object.entries(value).length === 0) {
        throw new ValidationException(403, 'Validation Error');
      }
      const data = await AuthService.registerUser(value);
      return res.status(201).json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = await loginValidator.validateAsync(req.body);

      if (!value) {
        throw new ValidationException(403, 'Validation Error');
      }

      const data = await AuthService.loginUser(value);
      return res.status(201).json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

export default new AuthController();
