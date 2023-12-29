import _ from 'lodash';
import { Repository } from 'typeorm';

import { ConflictException, Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Show } from './entities/show.entity';
import { Seat } from './entities/seat.entity';
import { Ticket } from './entities/ticket.entity';
import { Role } from './types/categoryRole.type';

@Injectable()
export class ShowService {
    constructor(
        @InjectRepository(Show)
        private showRepository: Repository<Show>,
        @InjectRepository(Seat)
        private seatRepository: Repository<Seat>,
        @InjectRepository(Ticket)
        private ticketRepository: Repository<Ticket>,
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
        const tickets = await this.seatRepository
        .createQueryBuilder('seats')
        .select([
          'seats.id AS seat_id',
          'seats.grade AS grade',
          'COALESCE((seats.seat_num - SUM(COALESCE(Ticket.seat_num, 0))), 0) AS seat_num',
          'seats.seat_price AS seat_price',
          'CONVERT_TZ(shows.show_date, "+00:00", "+09:00") AS show_date',
          'shows.show_time AS show_time',
        ])
        .leftJoin('tickets', 'Ticket', 'seats.id = Ticket.seat_id AND Ticket.cancel_chk = false')
        .leftJoin('shows', 'shows', 'shows.id = seats.show_id')
        .where('seats.show_id = :showId', { showId })
        .groupBy('seats.id, seats.grade, seats.seat_num, seats.seat_price, shows.show_date, shows.show_time')
        .getRawMany();
    
        if (_.isNil(tickets)) {
          throw new NotFoundException(' 예매 가능한 좌석 정보가 없습니다.');
        }
    
        return tickets;
      }

    async createTicket(userId:number,showId: number, grade: string, seat_num: number) {

      const ticket = await this.findTicket(showId);
      const matchingSeatNum = this.findSeatNumByGrade(ticket, grade);
      const matchingSeatId = this.findSeatNumBySeatId(ticket, grade);

      if (_.isNil(matchingSeatNum) || _.isNil(matchingSeatId)) {
        throw new NotFoundException('공연에 해당 등급 좌석 정보가 없습니다.');
      }

      if (matchingSeatNum===0) {
        throw new BadRequestException('공연에 해당 등급 좌석이 매진되었습니다.');
      }

      if ((matchingSeatNum-seat_num)<0) {
        throw new BadRequestException('해당 등급 좌석이 부족합니다.');
      }

      const matchingShowDate = this.findSeatNumByShowDate(ticket, grade).toISOString().split('T')[0];
      const matchingShowTime = this.findSeatNumByShowTime(ticket, grade);
      

      // 현재 날짜와 시간을 가져옴
      const nowTime = new Date();
      const showTime = new Date(`${matchingShowDate} ${matchingShowTime}`);

      const showTimeBeforeThree = new Date(`${matchingShowDate} ${matchingShowTime}`);

      // 3시간 전 시간을 계산
      showTimeBeforeThree.setHours(showTimeBeforeThree.getHours() - 3);

      if(nowTime>showTime){
        throw new BadRequestException('지난 공연입니다.');
      }

      if(nowTime>showTimeBeforeThree){
        throw new BadRequestException('공연 세시간 전은 예매 불가합니다.');
      }else{

        await this.ticketRepository.save({
          user_id:userId,
          seat_id:matchingSeatId,
          grade,
          seat_num
        });

      }
    }

    async updateTicket(userId: number, showId: number, ticketId: number) {
      await this.verifyShowById(showId);
      await this.ticketRepository.update({ id:ticketId }, { cancel_chk:true });
    }

    private findSeatNumByGrade(ticket:any, targetGrade:string) {
          const matchingSeat = ticket.find(({ grade }) => grade === targetGrade);
        
          return matchingSeat ? matchingSeat.seat_num : null;
    }

    private findSeatNumBySeatId(ticket:any, targetGrade:string) {
      const matchingSeat = ticket.find(({ grade }) => grade === targetGrade);
    
      return matchingSeat ? matchingSeat.seat_id : null;
    }

    private findSeatNumByShowTime(ticket:any, targetGrade:string) {
      const matchingSeat = ticket.find(({ grade }) => grade === targetGrade);
    
      return matchingSeat ? matchingSeat.show_time : null;
    }

    private findSeatNumByShowDate(ticket:any, targetGrade:string) {
      const matchingSeat = ticket.find(({ grade }) => grade === targetGrade);
    
      return matchingSeat ? matchingSeat.show_date : null;
    }

    private async verifyShowById(id: number) {
        const show = await this.showRepository.findOneBy({ id });
        if (_.isNil(show)) {
          throw new NotFoundException('존재하지 않는 공연입니다.');
        }
    
        return show;
    }
}
