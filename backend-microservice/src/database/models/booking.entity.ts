import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Users } from './user.entity';
import Hostel from './hostel.entiy';

@Entity()
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Users, (user) => user.bookings)
  user!: Users;

  @ManyToOne(() => Hostel, (hostel) => hostel.bookings)
  hostel!: Hostel;

  @Column({ type: 'date' })
  bookingDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
