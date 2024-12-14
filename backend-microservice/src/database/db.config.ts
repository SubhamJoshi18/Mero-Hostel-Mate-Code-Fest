import { DataSourceOptions } from 'typeorm';
import { getEnv } from '../utils/getEnv';
import { Users } from './models/user.entity';
import { UserProfile } from './models/userProfile.entity';

import { Payment } from './models/payment.entity';
import Hostel from './models/hostel.entiy';
import { Booking } from './models/booking.entity';
import { Hostelers } from './models/hosteler.entity';

export function getDbConfig(): DataSourceOptions {
  return {
    type: 'postgres',
    host: getEnv('DB_HOST') as string,
    port: Number(getEnv('DB_PORT')),
    username: getEnv('DB_USERNAME') as string,
    password: getEnv('DB_PASSWORD') as string,
    database: getEnv('DB_DATABASE') as string,
    synchronize: true,
    logging: true, // Enable logging
    entities: [Users, Hostelers, Hostel, Booking, UserProfile, Payment],
  } as DataSourceOptions;
}
