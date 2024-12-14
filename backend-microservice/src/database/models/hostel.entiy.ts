import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './user.entity';
import { Booking } from './booking.entity';
import { Hostelers } from './hosteler.entity';

@Entity()
class Hostel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50 })
  place_id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text', nullable: true })
  location!: string;

  @Column({ type: 'float', nullable: true })
  rating!: number;

  @Column({ type: 'text', nullable: true })
  img!: string;

  @Column({ type: 'bigint', nullable: true })
  user_ratings_total!: number;

  @Column({ type: 'numeric', nullable: true })
  price!: number;

  @Column({ type: 'text', nullable: true })
  hostel_type!: string;

  @Column({ type: 'text', nullable: true })
  owner_id!: string;

  @Column({ type: 'int', default: 0 })
  total_rooms_left!: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  owner_name!: string;

  @OneToMany(() => Booking, (booking) => booking.hostel)
  bookings!: Booking[];

  @OneToMany(() => Hostelers, (hostelers) => hostelers.hostel)
  hostelers!: Hostelers[];
}

export default Hostel;
