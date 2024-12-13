import { Users } from '../database/models/user.entity';
import { UserProfile } from '../database/models/userProfile.entity';
import { DatabaseException } from '../exceptions';

class UserProfileService {
  async getUserProfile(id: number) {
    const userData = await Users.findOne({
      where: {
        id,
      },
    });
    if (!userData) {
      throw new DatabaseException(400, 'User not Found');
    }
    return userData;
  }

  async updateUserProfile(id: number) {}
}

export default new UserProfileService();
