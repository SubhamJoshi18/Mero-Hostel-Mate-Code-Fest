import { Router } from 'express';
import BookingController from '../controller/booking.controller';
import { verifyAuthMiddleware } from '../middleware/verifyAuthMiddleware';
import { checkIsAdmin } from '../middleware/rolebaseMiddleware';
const bookingRouter = Router();

bookingRouter.post(
  '/book/hostel/:place_id',
  verifyAuthMiddleware as any,
  BookingController.bookHostel as any
);

bookingRouter.post(
  '/user/bookings',
  verifyAuthMiddleware as any,
  BookingController.getUserBooking as any
);

bookingRouter.post(
  '/book/hostel/:hostelId',
  verifyAuthMiddleware as any,
  checkIsAdmin as any,
  BookingController.bookHostel as any
);

export default bookingRouter;
