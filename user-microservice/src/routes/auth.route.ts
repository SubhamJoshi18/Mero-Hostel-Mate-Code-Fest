import { Router } from 'express';
import AuthController from '../controller/auth.Controller';
const authRouter = Router();

authRouter.post('/register', AuthController.registerUser as any);
authRouter.post('/login', AuthController.loginUser as any);

export default authRouter;
