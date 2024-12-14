import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Booking } from './booking.entity';
import { Hostelers } from './hosteler.entity';

@Entity()
class Hostel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  place_id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text', nullable: true })
  address!: string;

  @Column({ type: 'bigint', nullable: true })
  pan_number!: number;

  @Column({ type: 'float', nullable: true, default: 0 })
  rating!: number;

  @Column({ type: 'text', nullable: true })
  img!: string;

  @Column({ type: 'bigint', nullable: true, default: 0 })
  user_ratings_total!: number;

  @Column({ type: 'numeric', nullable: true })
  price!: number;

  @Column({ type: 'text', nullable: true })
  hostel_type!: string;

  @Column({ type: 'text', nullable: true })
  owner_id!: string;

  @Column({ type: 'int', default: 0 })
  number_of_rooms!: number;

  @Column({ type: 'int', default: 0 })
  total_capacity!: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  owner_name!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone!: string;

  @Column({ type: 'text', nullable: true })
  room_type!: string;

  @Column({ type: 'jsonb', nullable: true })
  features!: {
    electricity24Hours?: boolean;
    hotWater?: boolean;
    laundry?: boolean;
    wifi?: boolean;
    parking?: boolean;
    lockerRoom?: boolean;
  };

  @OneToMany(() => Booking, (booking) => booking.hostel)
  bookings!: Booking[];

  @OneToMany(() => Hostelers, (hostelers) => hostelers.hostel)
  hostelers!: Hostelers[];
}

export default Hostel;
