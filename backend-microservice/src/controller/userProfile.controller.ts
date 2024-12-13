import type, { Request, Response, NextFunction } from 'express';
import UserProfileService from '../services/userProfile.service';

class UserProfileController {
  private userProfileService: typeof UserProfileService | null = null;

  constructor() {
    this.userProfileService = UserProfileService;
  }

  getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id =
        typeof req.user._id === 'string' ? Number(req.user._id) : req.user._id;

      const response = await this.userProfileService?.getUserProfile(id);
      return res.status(201).json({
        message: 'User Data',
        data: response,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default new UserProfileController();
