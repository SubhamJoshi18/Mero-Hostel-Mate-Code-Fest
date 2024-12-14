import { Booking } from '../database/models/booking.entity';
import Hostel from '../database/models/hostel.entiy';
import { Users } from '../database/models/user.entity';
import { DatabaseException } from '../exceptions';

class BookingService {
  public async bookHostel(userId: number, hostelId: string) {
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
    const booking = new Booking();
    if (!user || !hostel) {
      throw new DatabaseException(400, 'User or Hostel not Found');
    }
    booking.user = user;
    booking.hostel = hostel;
    const saveResult = await booking.save();
    return saveResult;
  }

  public async getAllBooking(userId: number) {
    const user = await Users.findOne({
      where: {
        id: userId,
      },
      relations: ['bookings'],
    });
    if (!user) {
      throw new DatabaseException(400, 'User not Found');
    }
    return user.bookings;
  }

  public async getAllHostelBooking(hostelId: string) {
    const hostel = await Hostel.findOne({
      where: {
        place_id: hostelId,
      },
      relations: {
        bookings: true,
      },
    });
    if (!hostel) {
      throw new DatabaseException(400, 'Hostel not Found');
    }
    return hostel.bookings;
  }
}

export default new BookingService();
