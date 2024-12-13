import { Router } from 'express';
import UserProfileController from '../controller/userProfile.controller';

const userProfileRouter = Router();

userProfileRouter.get(
  '/user/profile/:id',
  UserProfileController.getUserProfile as any
);

export default userProfileRouter;
