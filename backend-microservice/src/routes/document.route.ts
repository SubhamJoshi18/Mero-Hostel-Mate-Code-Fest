import { Router } from 'express';
import { verifyAuthMiddleware } from '../middleware/verifyAuthMiddleware';
import DocumentController from '../controller/document.controller';
import upload from '../config/multerConfig';

const documentRouter = Router();

documentRouter.post(
  '/user/document',
  verifyAuthMiddleware as any,
  upload.single('citizenshipPhoto'),
  DocumentController.verifyandInsertDocument
);

export default documentRouter;
