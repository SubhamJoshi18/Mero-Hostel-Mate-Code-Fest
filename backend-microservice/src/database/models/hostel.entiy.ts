import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Users } from './user.entity';

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

  @Column({ type: 'text' })
  hostel_type!: string;

  @Column({ type: 'int' })
  total_rooms_left!: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  owner_name!: string;

  @ManyToMany(() => Users, (user) => user.hostels)
  @JoinTable()
  users!: Users[];
}

export default Hostel;
