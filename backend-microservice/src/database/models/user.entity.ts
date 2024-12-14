import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  DeleteDateColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { Payment } from './payment.entity';
import { UserProfile } from './userProfile.entity';
import Hostel from './hostel.entiy';
import { Booking } from './booking.entity';

enum RoleEnum {
  OWNER = 'owner',
  USER = 'user',
}

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phoneNumber!: string;

  @Column({ type: 'text', nullable: true })
  role!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings!: Booking[];

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  userProfile!: UserProfile;

  @OneToOne(() => Payment, (payment) => payment.user)
  payment!: Payment;
}
