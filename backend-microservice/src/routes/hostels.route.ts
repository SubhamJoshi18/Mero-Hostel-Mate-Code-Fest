import { Router } from 'express';
import HostelController from '../controller/hostel.controller';
import {
  checkBookMiddleware,
  verifyAuthMiddleware,
} from '../middleware/verifyAuthMiddleware';
import { checkIsAdmin } from '../middleware/rolebaseMiddleware';

const hostelRouter = Router();

hostelRouter.get('/hostels', HostelController.fetchHostel as any);

hostelRouter.get('/hostel/:hostelId', HostelController.fetchHostelById as any);

hostelRouter.get(
  '/rejects',
  verifyAuthMiddleware as any,
  checkIsAdmin as any,
  HostelController.showAllReject as any
);

hostelRouter.get(
  '/approve',
  verifyAuthMiddleware as any,
  checkIsAdmin as any,
  HostelController.showAllApprove as any
);

hostelRouter.get(
  '/pending',
  verifyAuthMiddleware as any,
  checkIsAdmin as any,
  HostelController.showAllPending as any
);

hostelRouter.get(
  '/approve/user',
  verifyAuthMiddleware as any,
  checkIsAdmin as any,
  HostelController.approveMessage as any
);

hostelRouter.get(
  '/reject/user',
  verifyAuthMiddleware as any,
  checkIsAdmin as any,
  HostelController.rejectMessage as any
);

hostelRouter.post(
  '/register/hosteler',
  verifyAuthMiddleware as any,
  checkIsAdmin as any,
  HostelController.registerHosteler as any
);

hostelRouter.get('/search', HostelController.searchByPrefreneces as any);

export default hostelRouter;
