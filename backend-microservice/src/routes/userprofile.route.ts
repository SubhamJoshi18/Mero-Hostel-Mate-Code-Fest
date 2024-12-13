import { Router } from 'express';
import UserProfileController from '../controller/userProfile.controller';
import { verifyAuthMiddleware } from '../middleware/verifyAuthMiddleware';

const userProfileRouter = Router();

userProfileRouter.get(
  '/user/profile',
  verifyAuthMiddleware as any,
  UserProfileController.getUserProfile as any
);

userProfileRouter.get(
  '/user/hostel',
  verifyAuthMiddleware as any,
  UserProfileController.getUserProfile as any
);

export default userProfileRouter;
