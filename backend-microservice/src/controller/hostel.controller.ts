import type, { Request, Response, NextFunction } from 'express';
import HostelService from '../services/hostel.service';

class HostelController {
  adminDashboardData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const hostelId = req.params.hostelId;
      const response = await HostelService.adminDashboardData(hostelId);
      return res.status(201).json({
        message: 'Admin Dashboard Data',
        response,
      });
    } catch (err) {
      next(err);
    }
  };

  fetchHostel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lat = req.query.lat;
      const lng = req.query.lng;
      const coordinates = {
        lat,
        lng,
      };
      const allHostels = await HostelService.fetchAllHostel(coordinates as any);

      return res.status(201).json({
        hostels: allHostels,
      });
    } catch (err) {
      next(err);
    }
  };

  fetchHostelById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hostelId = req.params.hostelId;
      const hostel = await HostelService.fetchHostelById(hostelId);
      return res.status(201).json({
        hostel,
      });
    } catch (err) {
      next(err);
    }
  };

  showAllReject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hostelId = req.params.hostelId;
      const hostel = await HostelService.showAllReject(hostelId);
      return res.status(201).json({
        hostel,
      });
    } catch (err) {
      next(err);
    }
  };

  showAllApprove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hostelId = req.params.hostelId;
      const hostel = await HostelService.showAllApprove(hostelId);
      return res.status(201).json({
        hostel,
      });
    } catch (err) {
      next(err);
    }
  };

  updateRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hostelId = req.params.hostelId;
      const validData = req.body;
      const response = await HostelService.updateRegister(hostelId, validData);
      return res.status(201).json({
        response,
      });
    } catch (err) {
      next(err);
    }
  };

  showAllPending = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hostelId = req.params.hostelId;
      const hostel = await HostelService.showAllPending(hostelId);
      return res.status(201).json({
        hostel,
      });
    } catch (err) {
      next(err);
    }
  };

  approveMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const HostelerId =
        typeof req.params.hostelerId === 'string'
          ? Number(req.params.hostelerId)
          : req.params.hostelerId;
      const response = await HostelService.approveRequest(HostelerId);
      return res.status(201).json({
        response,
      });
    } catch (err) {
      next(err);
    }
  };

  rejectMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const HostelerId =
        typeof req.params.hostelerId === 'string'
          ? Number(req.params.hostelerId)
          : req.params.hostelerId;
      const response = await HostelService.rejectRequest(HostelerId);
      return res.status(201).json({
        response,
      });
    } catch (err) {
      next(err);
    }
  };
  registerHosteler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validData = req.body;
      const hostelId = req.params.hostelId;
      const response = await HostelService.registerHostelers(
        validData,
        hostelId
      );
      return res.status(201).json({
        message: 'Hostelers Registered',
        response,
      });
    } catch (err) {
      next(err);
    }
  };

  async searchByPrefreneces(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParams = req.query;
      const response = await HostelService.searchHostelByPrefrences(
        queryParams
      );
      return res.status(201).json({
        data: response,
      });
    } catch (err) {
      next(err);
    }
  }

  async createHostel(req: Request, res: Response, next: NextFunction) {
    try {
      const validData = req.body;
      const user_id = req.user._id;
      const response = await HostelService.createHostel(validData, user_id);
      return res.status(201).json({
        message: `Hostel Created SuccessFully`,
        response,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new HostelController();
