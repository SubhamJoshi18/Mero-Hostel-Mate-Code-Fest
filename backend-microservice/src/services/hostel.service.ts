import RabbitMqProducer from '../RabbitMq/producer/rabbitmqProducer';
import { getEnv } from '../utils/getEnv';
import { getGoogleMapClient } from '../config/googleMpConfig';
import { Client } from '@googlemaps/google-maps-services-js';
import Hostel from '../database/models/hostel.entiy';
import { DatabaseException } from '../exceptions';
import { Users } from '../database/models/user.entity';

class HostelService {
  private GOOGLE_API_KEY = getEnv('GOOGLE_API_KEY');
  private producer: RabbitMqProducer | null = null;
  private googleMapClient: Client = getGoogleMapClient();

  constructor() {
    this.producer = new RabbitMqProducer();
  }

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
    if (item.toLowerCase().includes('boys')) {
      return 'Boys';
    } else if (
      item.toLowerCase().includes('girls') ||
      item.toLowerCase().includes('ladies') ||
      item.toLowerCase().includes('girl')
    ) {
      return 'Girls';
    } else {
      return 'Both';
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

  bookHostel = async (user_id: number, place_id: string) => {
    try {
      const findUser = await Users.findOne({
        where: {
          id: user_id,
        },
        relations: ['hostels'],
      });

      const existsHostel = await Hostel.findOne({
        where: {
          place_id: place_id,
        },
        relations: ['users'],
      });

      if (!findUser || !existsHostel) {
        throw new DatabaseException(403, 'Hostel or User is Missing');
      }

      if (!existsHostel.users.some((user) => user.id === findUser.id)) {
        existsHostel.users.push(findUser);
        await existsHostel.save();
      }

      return {
        message: 'Hostel booked successfully',
        hostel: existsHostel,
      };
    } catch (error) {
      console.error('Error booking hostel:', error);
      throw new DatabaseException(500, 'Internal Server Error');
    }
  };

  async fetchUserHostel(userId: number) {
    const userData = await Users.findOne({
      where: {
        id: userId,
      },
      relations: {
        hostels: true,
      },
    });
    return userData;
  }
}

export default new HostelService();
