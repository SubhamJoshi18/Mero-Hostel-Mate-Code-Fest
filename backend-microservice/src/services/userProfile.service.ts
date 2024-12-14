import Hostel from '../database/models/hostel.entiy';
import { Hostelers } from '../database/models/hosteler.entity';
import { Users } from '../database/models/user.entity';
import { UserProfile } from '../database/models/userProfile.entity';
import { DatabaseException } from '../exceptions';
import GenAiSevices from './geminiAi.service';

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

  async sendHostApproval(
    data: {
      college: string;
      gender: string;
      faculty: string;
      dateOfBirth: string;

      approvalMessage?: string;
    },
    userId: number,
    hostelId: string,
    flagAi: string
  ) {
    const user = await Users.findOne({
      where: {
        id: userId,
      },
    });
    const hostel = await Hostel.findOne({
      where: {
        place_id: hostelId,
      },
    });

    if (!user || !hostel) {
      throw new DatabaseException(400, 'User or Hostel not Found');
    }

    if (flagAi === 'enabled' && data.approvalMessage) {
      try {
        const translatedMessage = await GenAiSevices.translateToNepali(
          data.approvalMessage
        );
        console.log(translatedMessage);
        const saveData = await Hostelers.create({
          college: data.college,
          gender: data.gender,
          faculty: data.faculty,
          date_of_birth: data.dateOfBirth,
          approvedMessage: translatedMessage,
        }).save();
        hostel.hostelers = [saveData];
        await hostel.save();
        return {
          message: 'Approval message processed with AI',
          translatedMessage,
        };
      } catch (error: any) {
        throw new DatabaseException(
          500,
          `Error processing approval with AI: ${error.message}`
        );
      }
    } else {
      const saveData = await Hostelers.create({
        college: data.college,
        faculty: data.faculty,
        gender: data.gender,
        date_of_birth: data.dateOfBirth,
        approvedMessage: data.approvalMessage,
      }).save();
      hostel.hostelers = [saveData];
      await hostel.save();
      return { message: 'Approval message processed without AI' };
    }
  }
}

export default new UserProfileService();
