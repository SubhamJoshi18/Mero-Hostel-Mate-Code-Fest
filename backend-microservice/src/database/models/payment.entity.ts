import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './user.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'numeric' })
  total_amount!: number;

  @Column({ type: 'text' })
  payment_method!: string;

  @CreateDateColumn()
  payment_date!: Date;

  @OneToOne(() => Users, (user) => user.payment)
  user!: Users;
}
