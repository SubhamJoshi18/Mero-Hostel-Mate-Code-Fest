import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { Users } from './user.entity';

@Entity()
export class UserProfile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50 })
  college!: string;

  @Column({ type: 'text' })
  address!: string;

  @Column({ type: 'varchar', length: 10 })
  roomNumber!: string;

  @Column({ type: 'text' })
  image!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToOne(() => Users, (users) => users.userProfile)
  user!: Users;
}
