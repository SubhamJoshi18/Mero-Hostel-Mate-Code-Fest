import type, { Request, Response, NextFunction } from 'express';
import HostelService from '../services/hostel.service';

class HostelController {
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

  bookHostel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const placeId = req.params.place_id;
      const userId =
        typeof req.user._id === 'string' ? Number(req.user._id) : req.user._id;

      const response = await HostelService.bookHostel(userId, placeId);
      return res.status(201).json({
        message: response,
      });
    } catch (err) {
      next(err);
    }
  };

  fetchUserHostel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id;
      const parseUserId = Number(req.user._id);
      const response = await HostelService.fetchUserHostel(parseUserId);
      return res.status(201).json({
        message: `User Hostels`,
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
    } catch (err) {
      next(err);
    }
  };
}

export default new HostelController();
