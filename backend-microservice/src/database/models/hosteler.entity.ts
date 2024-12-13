import {
  BaseEntity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './user.entity';
import { UserProfile } from './userProfile.entity';

export class Hostelers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @Column({ type: 'text' })
  college!: string;

  @Column({ type: 'varchar', length: 50 })
  gender!: string;

  @Column({ type: 'varchar', length: 50 })
  faculty!: string;

  @Column({ type: 'date', length: 50 })
  date_of_birth!: Date;

  @Column({ type: 'int' })
  room_number!: number;
}
