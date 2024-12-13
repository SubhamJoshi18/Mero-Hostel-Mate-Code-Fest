import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  DeleteDateColumn,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import Hostel from './hostel.entiy';

enum RoleEnum {
  OWNER = 'owner',
  USER = 'user',
}

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
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

  @ManyToMany(() => Hostel, (hostel) => hostel.users)
  hostels!: Hostel[];
}
