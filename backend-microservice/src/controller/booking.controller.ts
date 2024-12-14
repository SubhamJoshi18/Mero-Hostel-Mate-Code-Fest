import { NextFunction, Request, Response } from 'express';
import BookingService from '../services/booking.service';

class BookingController {
  bookHostel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId =
        typeof req.user._id === 'string' ? Number(req.user._id) : req.user._id;

      const hostelId = req.params.place_id;
      const response = await BookingService.bookHostel(userId, hostelId);
      return res.status(201).json({
        message: `User with id ${userId} has successfully booked hostel with id ${hostelId}`,
        response,
      });
    } catch (err) {
      next(err);
    }
  };

  getUserBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId =
        typeof req.user._id === 'string'
          ? Number(req.user._id)
          : req.user._id.toString();

      const response = await BookingService.getAllBooking(userId);
      return res.status(201).json({
        message: `User with id ${userId} has successfully booked hostel with id ${userId}`,
        response,
      });
    } catch (err) {
      next(err);
    }
  };

  getAllHostelBooking = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const hostelId = req.params.hostelId;

      const response = await BookingService.getAllHostelBooking(hostelId);
      return res.status(201).json({
        message: `Hostel with id ${hostelId} has successfully Fetches all the  users with id ${hostelId}`,
        response,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default new BookingController();
