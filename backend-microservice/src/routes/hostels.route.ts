import { Router } from 'express';
import HostelController from '../controller/hostel.controller';
import {
  checkBookMiddleware,
  verifyAuthMiddleware,
} from '../middleware/verifyAuthMiddleware';
import { checkIsAdmin } from '../middleware/rolebaseMiddleware';

const hostelRouter = Router();

// hostelRouter.get('/hostels', HostelController.fetchHostel as any);

// hostelRouter.get('/hostel/:hostelId', HostelController.fetchHostelById as any);

hostelRouter.get(
  '/rejects',
  verifyAuthMiddleware as any,
  checkIsAdmin as any,
  HostelController.showAllReject as any
);

hostelRouter.get(
  '/approve/:hostelId',
  verifyAuthMiddleware as any,
  checkIsAdmin as any,
  HostelController.showAllApprove as any
);

hostelRouter.get(
  '/pending/:hostelId',
  verifyAuthMiddleware as any,
  checkIsAdmin as any,
  HostelController.showAllPending as any
);

hostelRouter.patch(
  '/approve/user/:hostelerId',
  verifyAuthMiddleware as any,
  checkIsAdmin as any,
  HostelController.approveMessage as any
);

hostelRouter.patch(
  '/reject/user',
  verifyAuthMiddleware as any,
  checkIsAdmin as any,
  HostelController.rejectMessage as any
);

hostelRouter.post(
  '/register/hosteler/:hostelId',
  verifyAuthMiddleware as any,
  checkIsAdmin as any,
  HostelController.registerHosteler as any
);

hostelRouter.post(
  '/register/hostel',
  verifyAuthMiddleware as any,
  checkIsAdmin as any,
  HostelController.createHostel as any
);

hostelRouter.get('/search', HostelController.searchByPrefreneces as any);

hostelRouter.post(
  '/dashboard/:hostelId',
  verifyAuthMiddleware as any,
  HostelController.adminDashboardData as any
);

export default hostelRouter;
