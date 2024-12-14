import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './user.entity';
import { UserProfile } from './userProfile.entity';
import Hostel from './hostel.entiy';

@Entity()
export class Hostelers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  college!: string;

  @Column({ type: 'text', nullable: true })
  address!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phoneNumber!: string;

  @Column({ type: 'varchar', length: 50 })
  gender!: string;

  @Column({ type: 'varchar', length: 50 })
  faculty!: string;

  @Column({ type: 'varchar', length: 50 })
  date_of_birth!: string;

  @Column({ type: 'int', nullable: true })
  room_number!: number;

  @Column({ type: 'text', default: 'pending' })
  status!: string;

  @Column({ type: 'text', nullable: true })
  approvedMessage!: string;

  @ManyToOne(() => Hostel, (hostel) => hostel.hostelers)
  hostel!: Hostel;

  @CreateDateColumn()
  createdAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
