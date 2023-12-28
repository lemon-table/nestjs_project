import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Show } from './show.entity';
@Entity({
  name: 'seats',
})
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Show, (show) => show.seat)
  @JoinColumn({ name: 'show_id' })
  show: Show;

  @Column({ type: 'int', nullable: false })
  show_id: number;

  @Column({ type: 'varchar', nullable: false })
  grade: string;

  @Column({ type: 'int', nullable: false })
  seat_num: number;

  @Column({ type: 'int', nullable: false })
  seat_price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}