import { Column, Entity, JoinColumn, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../types/categoryRole.type';
import { User } from '../../user/entities/user.entity';
import { Seat } from './seat.entity';

@Entity({
  name: 'tickets',
})
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.ticket)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int', nullable: false })
  user_id: number;

  @ManyToOne(() => Seat, (seat) => seat.ticket)
  @JoinColumn({ name: 'seat_id' })
  seats: Seat;

  @Column({ type: 'int', nullable: false })
  seat_id: number;

  @Column({ type: 'varchar', nullable: false })
  grade: string;

  @Column({ type: 'int', nullable: false })
  seat_num: number;

  @Column({ type: 'boolean', default: false, nullable: false })
  cancel_chk: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}