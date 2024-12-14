import RabbitMqProducer from '../RabbitMq/producer/rabbitmqProducer';
import { getEnv } from '../utils/getEnv';
import { getGoogleMapClient } from '../config/googleMpConfig';
import { Client } from '@googlemaps/google-maps-services-js';
import Hostel from '../database/models/hostel.entiy';
import { DatabaseException } from '../exceptions';
import { Users } from '../database/models/user.entity';
import { Hostelers } from '../database/models/hosteler.entity';
import axios from 'axios';
import { NextFunction } from 'express';
import { v1 as uuidv1 } from 'uuid';

class HostelService {
  private GOOGLE_API_KEY = getEnv('GOOGLE_API_KEY');
  private producer: RabbitMqProducer | null = null;
  private googleMapClient: Client = getGoogleMapClient();

  constructor() {
    this.producer = new RabbitMqProducer();
  }

  adminDashboardData = async (hostelId: string) => {
    const hostel = await Hostel.findOne({
      where: {
        place_id: hostelId,
      },
    });
    if (!hostel) {
      throw new DatabaseException(403, 'Hostel not Found');
    }
    if (hostel.hostelers.length === 0) {
      throw new DatabaseException(404, 'No Hostelers found');
    }

    const totalHostelers = hostel.hostelers.length;
    const totalApproved = hostel.hostelers.filter(
      (data: any) => data.status === 'approved'
    ).length;

    const totalPendings = hostel.hostelers.filter(
      (data: any) => data.status === 'pending'
    );
    return {
      totalApproved,
      totalHostelers,
      totalPendings,
    };
  };

  fetchAllHostel = async (coordinates: { lat: string; lng: string }) => {
    const allHostels = [];
    const radius = 50000;
    let nextPageToken = undefined;
    const hostelCount = await Hostel.count({});

    if (hostelCount > 1) {
      const datas = await Hostel.find();
      return datas;
    }
    try {
      while (true) {
        const response = await this.googleMapClient.placesNearby({
          params: {
            location: coordinates as any,
            radius,
            keyword: 'hostels',
            opennow: false,
            pagetoken: nextPageToken,
            key: this.GOOGLE_API_KEY as string,
          },
          timeout: 1000,
        });

        const excludedTypes = new Set([
          'bar',
          'restaurant',
          'travel_agency',
          'food',
        ]);

        const hostels = response.data.results.filter(
          (place: any) =>
            place.types?.includes('lodging' as any) &&
            place.name.toLowerCase().includes('hostel') &&
            !place.types?.some((type: any) => excludedTypes.has(type))
        );

        allHostels.push(...hostels);

        nextPageToken = response.data.next_page_token;
        if (!nextPageToken) {
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      console.log('Total Hostels Found:', allHostels.length);
      await this.insertDb(allHostels);
      return allHostels;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchHostelById = async (hostelId: string) => {
    const isHostel = await Hostel.findOne({
      where: {
        place_id: hostelId,
      },
    });
    if (!isHostel) {
      throw new DatabaseException(403, 'Hostel not found or Does not Exists');
    }

    try {
      const resultData = await this.googleMapClient.placeDetails({
        params: {
          place_id: hostelId,
          key: this.GOOGLE_API_KEY as string,
        },
      });

      const placeDetails: any = resultData.data.result;
      const photoReferences =
        placeDetails.photos.length > 0
          ? placeDetails.photos.map((photo: any) => photo.photo_reference)
          : [];
      const updatedHostel = {
        ...isHostel,
        review_comments: placeDetails.reviews || 'No Review Info',
        phoneNumber: placeDetails.formatted_phone_number || 'No Phone Info',
        photos: photoReferences,
      };

      return updatedHostel;
    } catch (error) {
      console.error('Error fetching place details:', error);
      throw new DatabaseException(500, 'Failed to fetch place details');
    }
  };

  private assertGender(item: any) {
    if (item.toLowerCase().includes('girl')) {
      return 'Girl';
    } else {
      return 'Boy';
    }
  }

  private async insertDb(data: any) {
    try {
      const count = await Hostel.count();
      const randomizePrice = [2000, 3000, 2500, 5000, 2300, 1220, 3500, 1200];
      const roomLeft = [, 9, 12, 5, 4, 6, 7, 3, 1, 2];
      const ownerName = ['John Doe', 'Jane Doe', 'John Smith', 'Jane Smith'];
      if (count === 0) {
        for (const item of data) {
          const payload = {
            place_id: item.place_id,
            name: item.name,
            location: item.vicinity,
            rating: item.rating,
            user_ratings_total: item.user_ratings_total,
            img:
              item.photos && item.photos.length > 0
                ? item.photos[0].photo_reference
                : null,
            price:
              randomizePrice[Math.floor(Math.random() * randomizePrice.length)], // Randomize price
            hostel_type: this.assertGender(item.name),
            total_rooms_left:
              roomLeft[Math.floor(Math.random() * roomLeft.length)],
            owner_name: ownerName[Math.floor(Math.random() * ownerName.length)],
          };

          console.log('Inserting item:', payload);

          await Hostel.create(payload as any).save();
        }
        console.log('Data inserted successfully');
      } else {
        console.log('Database is not empty, skipping insertion');
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }

  async showAllReject(hostelId: string) {
    const hostel = await Hostel.findOne({
      where: {
        place_id: hostelId,
      },
      relations: {
        hostelers: true,
      },
    });
    if (!hostel?.hostelers) {
      throw new DatabaseException(404, 'No Hostelers found');
    }

    const extractHostel = (data: any) => {
      return data.filter((item: any) => item.status === 'rejected');
    };
    const extractedHostel = extractHostel(hostel.hostelers);
    return extractedHostel;
  }

  async showAllApprove(hostelId: string) {
    const hostel = await Hostel.findOne({
      where: {
        place_id: hostelId,
      },
      relations: {
        hostelers: true,
      },
    });
    if (!hostel?.hostelers) {
      throw new DatabaseException(404, 'No Hostelers found');
    }

    const extractHostel = (data: any) => {
      return data.filter((item: any) => item.status === 'approved');
    };
    const extractedHostel = extractHostel(hostel.hostelers);
    return extractedHostel;
  }

  async showAllPending(hostelId: string) {
    const hostel = await Hostel.findOne({
      where: {
        place_id: hostelId,
      },
      relations: {
        hostelers: true,
      },
    });
    if (!hostel?.hostelers) {
      throw new DatabaseException(404, 'No Hostelers found');
    }

    const extractHostel = (data: any) => {
      return data.filter((item: any) => item.status === 'pending');
    };
    const extractedHostel = extractHostel(hostel.hostelers);
    return extractedHostel;
  }

  async approveRequest(hostlerId: number) {
    const hostler = await Hostelers.findOne({
      where: {
        id: hostlerId,
      },
    });
    if (!hostler) {
      throw new DatabaseException(403, 'Hostler Id Does not Exists');
    }

    const isApproved = hostler.status.includes('approved');
    if (isApproved) {
      throw new DatabaseException(403, 'It is already Approved');
    }

    const updatedResult = await Hostelers.update(
      { id: hostlerId },
      {
        status: 'approved',
      }
    );
    return updatedResult;
  }

  async rejectRequest(hostlerId: number) {
    const hostler = await Hostelers.findOne({
      where: {
        id: hostlerId,
      },
    });
    if (!hostler) {
      throw new DatabaseException(403, 'Hostler Id Does not Exists');
    }
    const updatedResult = await Hostelers.update(
      { id: hostlerId },
      {
        status: 'rejected',
      }
    );
    return updatedResult;
  }

  async registerHostelers(validData: any, hostelId: string) {
    const hostel = await Hostel.findOne({
      where: {
        place_id: hostelId as string,
      },
    });
    if (!hostel) {
      throw new DatabaseException(403, 'Hostel not Found');
    }

    const newHostler = await Hostelers.create({
      name: validData.name,
      college: validData.college,
      faculty: validData.faculty,
      gender: validData.gender,
      address: validData.address,
      phoneNumber: validData.contact,
      date_of_birth: validData.dateofbirth,
      room_number: validData.roomNumber,
    }).save();
    hostel.hostelers = [newHostler];
    const savedResult = await hostel.save();
    return savedResult;
  }

  async searchHostelByPrefrences(queryParams: any) {
    const queryParamsKeys = Object.keys(queryParams);
    const hostel = queryParamsKeys[0];
    if (queryParamsKeys.includes('collegeName')) {
      const fetchAllHostel = await Hostel.find({});
      const collegeName = queryParams['collegeName'];
      const payload = {
        fetchAllHostel,
        collegeName,
      };
      try {
        const response = await axios.post(
          `http://127.0.0.1:5000/model/hostels`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error:', error);
        throw new DatabaseException(
          500,
          'Failed to search hostels by preferences'
        );
      }
    }
  }

  async createHostel(
    validData: {
      hostelName: string;
      address: string;
      panNumber: number;
      price: number;
      roomType: string;
      hostelType: string;
      email: string;
      phone: string;
      numberOfRooms: number;
      totalCapacity: number;
      features: {
        electricity24Hours: false;
        hotWater: false;
        laundry: false;
        wifi: false;
        parking: false;
        lockerRoom: false;
      };
    },
    user_id: number
  ) {
    const user = await Users.findOne({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      throw new DatabaseException(403, 'User not Found');
    }
    const ownerName = user.name;
    const newHostel = await Hostel.create({
      place_id: uuidv1(),
      name: validData.hostelName,
      owner_id: user.id as any,
      address: validData.address,
      pan_number: validData.panNumber,
      price: validData.price,
      room_type: validData.roomType,
      hostel_type: validData.hostelType,
      email: validData.email,
      phone: validData.phone,
      number_of_rooms: validData.numberOfRooms,
      total_capacity: validData.totalCapacity,
      owner_name: ownerName,
      features: validData.features,
    }).save();
    return newHostel.place_id;
  }
}

export default new HostelService();
