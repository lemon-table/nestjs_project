import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { Repository } from 'typeorm';

import { ConflictException, Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Ticket } from '../show/entities/ticket.entity';
import { Role } from './types/userRole.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
        private userRepository: Repository<User>,
    @InjectRepository(Ticket)
        private ticketRepository: Repository<Ticket>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(email: string, password: string, confirmPassword: string, nickname:string, role:Role, point:number) {

    if(password.length < 6){
        throw new BadRequestException(`비밀번호는 최소 6자리 이상이어야 합니다.`);
    }

    if (password !== confirmPassword){
        throw new BadRequestException('비밀번호와 비밀번호 확인란이 일치하지 않습니다.');
    }

    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }

    const hashedPassword = await hash(password, 10);
    await this.userRepository.save({
      email,
      password: hashedPassword,
      nickname,
      role,
      point
    });

    return{
      "message": "회원가입에 성공했습니다.",
      "success": true,
      "data":{email,nickname,role,point}
    }
  }

  async signIn(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });

    // 이메일 또는 패스워드로 오류 조건 변경
    if (_.isNil(user) || !(await compare(password, user.password))) {
      throw new UnauthorizedException('이메일 또는 패스워드를 확인해주세요.');
    }

    const payload = { email, sub: user.id };
    return {
      "message": "로그인에 성공했습니다.",
      "success": true,
      "data":{access_token: this.jwtService.sign(payload,{ expiresIn: '10m' })}
    };
  }

  async getProfile(userId: number) {
    const user = await this.userRepository.findOne({
      select: ['email', 'nickname','point'],
      where: { 'id':userId },
    });

    if (_.isNil(user)) {
      throw new NotFoundException('사용자 정보가 없습니다.');
    }

    return {
      "message": "프로필 상세정보 조회되었습니다.",
      "success": true,
      "data":user
    };
  }

  async uptProfile(userId: number,nickname:string) {
    const user = await this.userRepository.findOne({
      select: ['email', 'nickname','point'],
      where: { 'id':userId },
    });

    if (_.isNil(user)) {
      throw new NotFoundException('사용자 정보가 없습니다.');
    }

    await this.userRepository.update({ id:userId }, {nickname});

    return {
      "message": "프로필 정보를 수정했습니다.",
      "success": true,
    }
  } 

  async getUserTickets(userId: number) {

    const tickets = await this.ticketRepository
    .createQueryBuilder('tickets')
    .select([
      'tickets.id AS tickets_id',
      'tickets.user_id AS user_id',
      'seats.show_id AS show_id',
      'shows.show_name AS show_name',
      'shows.show_category AS show_category',
      'CONVERT_TZ(shows.show_date, "+00:00", "+09:00") AS show_date',
      'users.nickname AS nickname',
      'seats.grade AS grade',
      'tickets.seat_num AS seat_num',
      'tickets.cancel_chk AS cancel_chk',
    ])
    .leftJoin('seats', 'seats', 'tickets.seat_id = seats.id')
    .leftJoin('shows', 'shows', 'shows.id = seats.show_id')
    .leftJoin('users', 'users', 'tickets.user_id = users.id')
    .where('tickets.user_id = :userId', { userId })
    .getRawMany();

    if (_.isNil(tickets)) {
      throw new NotFoundException('예매 정보가 없습니다.');
    }

    return {
      "message": "사용자 예매 목록 조회되었습니다.",
      "success": true,
      "data": tickets
    };
    
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}