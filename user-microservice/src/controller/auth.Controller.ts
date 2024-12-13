import type, { Request, Response, NextFunction } from 'express';
import { HttpExceptions } from '../exceptions';
import { loginValidator, registerUser } from '../validators/joi/user.validator';
import AuthService from '../services/auth.service';

class AuthController {
  registerUser = async (req: Request, res: Response) => {
    try {
      const { error, value } = await registerUser.validateAsync(req.body);
      if (error) {
        throw error;
      }
      const data = await AuthService.registerUser(value);
      return res.status(201).json(data);
    } catch (err) {
      throw new HttpExceptions(500, 'Internal Server Error');
    }
  };

  loginUser = async (req: Request, res: Response) => {
    try {
      const { error, value } = await loginValidator.validateAsync(req.body);
      if (error) {
        throw error;
      }
      const data = await AuthService.loginUser(value);
      return res.status(201).json(data);
    } catch (err) {
      throw new HttpExceptions(500, 'Internal Server Error');
    }
  };
}

export default new AuthController();
