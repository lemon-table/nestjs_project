import _ from 'lodash';
import { Repository } from 'typeorm';

import { ConflictException, Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Show } from './entities/show.entity';
import { Seat } from './entities/seat.entity';
import { Role } from './types/categoryRole.type';

@Injectable()
export class ShowService {
    constructor(
        @InjectRepository(Show)
        private showRepository: Repository<Show>,
        @InjectRepository(Seat)
        private seatRepository: Repository<Seat>,
      ) {}

    async createShow(id:number,show_name: string, show_date: string, show_time: string, show_description:string, show_category:Role, show_location:string,seatInfo: any[]) {

        const show = this.showRepository.create({
                        user_id:id,
                        show_name,
                        show_date,
                        show_time,
                        show_description,
                        show_category,
                        show_location
                    });

        // Seat 엔터티 생성
        const seats = seatInfo.map(seat => {
            const { seat_num, grade, seat_price } = seat;
            const seatEntity = this.seatRepository.create({ seat_num, grade, seat_price });
                    seatEntity.show = show; // 연관 관계 설정
            return seatEntity;
        });

        // Show 정보 저장 (이 때 연관된 Seat 정보도 함께 저장됨)
        await this.showRepository.save(show);
  
        // Seat 정보 저장
        await this.seatRepository.save(seats);
    

    }

    async findAllShow(): Promise<Show[]> {
        return await this.showRepository.find({
          select: ['id', 'show_name','show_date','show_time','show_category'],
       });
    }

    async findOneShow(showId: number) {
        return await this.verifyShowById(showId);
    }

    async findTicket(showId: number) {
        /*
        const ticket = await this.seatRepository.find({
          select: ['grade', 'seat_num','seat_price'],
          where: { 'show_id':showId },
        });
        */
        const tickets = await this.seatRepository
        .createQueryBuilder('seats')
        .select([
          'seats.grade AS grade',
          'COALESCE((seats.seat_num - COALESCE(Ticket.seat_num, 0)), 0) AS seat_num',
          'seats.seat_price AS seat_price',
        ])
        .leftJoin('tickets', 'Ticket', 'seats.id = Ticket.seat_id AND Ticket.cancel_chk = false')
        .where('seats.show_id = :showId', { showId })
        .getRawMany();
    
        if (_.isNil(tickets)) {
          throw new NotFoundException(' 예매 가능한 좌석 정보가 없습니다.');
        }
    
        return tickets;
      }

    private async verifyShowById(id: number) {
        const show = await this.showRepository.findOneBy({ id });
        if (_.isNil(show)) {
          throw new NotFoundException('존재하지 않는 공연입니다.');
        }
    
        return show;
    }
}
