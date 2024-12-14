import { getGoogleMapClient } from '../config/googleMpConfig';
import Hostel from '../database/models/hostel.entiy';

const coordinates = {
  lat: 27.7219,
  lng: 85.324,
};

export const mapSeeder = async () => {
  const allHostels = [];
  const radius = 50000;
  const googleMapClient = getGoogleMapClient();
  let nextPageToken = undefined;
  const hostelCount = await Hostel.count({});

  if (hostelCount > 1) {
    const datas = await Hostel.find();
    return datas;
  }
  try {
    while (true) {
      const response = await googleMapClient.placesNearby({
        params: {
          location: coordinates as any,
          radius,
          keyword: 'hostels',
          opennow: false,
          pagetoken: nextPageToken,
          key: process.env.GOOGLE_API_KEY as string,
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
    await insertDb(allHostels);
    return allHostels;
  } catch (error) {
    console.error('Error:', error);
  }
};

const insertDb = async (hostels: any[]) => {
  const panNumbers = [1234567890, 9876543210, 1122334455, 5566778899];
  const prices = [1000, 1500, 2000, 2500];
  const roomTypes = ['Single', 'Shared', 'Both'];
  const hostelTypes = ['Boys', 'Girls'];
  const emails = [
    'hostel1@example.com',
    'hostel2@example.com',
    'hostel3@example.com',
  ];
  const phones = ['1234567890', '0987654321', '1122334455'];
  const numberOfRooms = [10, 20, 30, 40];
  const totalCapacities = [100, 200, 300, 400];
  const featuresList = [
    {
      electricity24Hours: true,
      hotWater: true,
      laundry: true,
      wifi: true,
      parking: true,
      lockerRoom: true,
    },
    {
      electricity24Hours: false,
      hotWater: true,
      laundry: false,
      wifi: true,
      parking: false,
      lockerRoom: true,
    },
    {
      electricity24Hours: true,
      hotWater: false,
      laundry: true,
      wifi: false,
      parking: true,
      lockerRoom: false,
    },
  ];

  const getRandomValue = (array: any[]) =>
    array[Math.floor(Math.random() * array.length)];

  for (const hostel of hostels) {
    await Hostel.create({
      place_id: hostel.place_id,
      name: hostel.name,
      address: hostel.vicinity,
      img:
        hostel.photos && hostel.photos.length > 0
          ? hostel.photos[0].photo_reference
          : '',
      pan_number: getRandomValue(panNumbers),
      price: getRandomValue(prices),
      room_type: getRandomValue(roomTypes),
      hostel_type: getRandomValue(hostelTypes),
      email: getRandomValue(emails),
      phone: getRandomValue(phones),
      number_of_rooms: getRandomValue(numberOfRooms),
      total_capacity: getRandomValue(totalCapacities),
      features: getRandomValue(featuresList),
    }).save();
  }
};
