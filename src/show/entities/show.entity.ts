import { Seat } from './seat.entity';
import { Column, Entity, JoinColumn, OneToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../types/categoryRole.type';
import { User } from '../../user/entities/user.entity';

@Entity({
  name: 'shows',
})
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.show)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int', nullable: false })
  user_id: number;

  @Column({ type: 'varchar', nullable: false })
  show_name: string;

  @Column({ type: 'date', nullable: false })
  show_date: string;

  @Column({ type: 'time', nullable: false })
  show_time: string;

  @Column({ type: 'text', nullable: false })
  show_description: string;

  @Column({ type: 'varchar', nullable: true })
  show_image: string;

  @Column({ type: 'enum', enum: Role, default: Role.Theater })
  show_category: Role;

  @Column({ type: 'varchar', nullable: false })
  show_location: string;

  @Column({ type: 'json', nullable: true }) // seatInfo 컬럼 추가, jsonb 형식으로 저장
  seatInfo: { seat_num: number; grade: string; seat_price: number }[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @OneToMany(() => Seat, (seat) => seat.show)
  seat: Seat[];
}