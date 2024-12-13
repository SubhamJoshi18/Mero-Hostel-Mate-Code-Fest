import { Router } from 'express';
import HostelController from '../controller/hostel.controller';
import {
  checkBookMiddleware,
  verifyAuthMiddleware,
} from '../middleware/verifyAuthMiddleware';

const hostelRouter = Router();

hostelRouter.get('/hostels', HostelController.fetchHostel as any);
hostelRouter.get('/hostel/:hostelId', HostelController.fetchHostelById as any);
hostelRouter.post(
  '/book/hostel/:place_id',
  checkBookMiddleware as any,
  verifyAuthMiddleware as any,
  HostelController.bookHostel as any
);

export default hostelRouter;
