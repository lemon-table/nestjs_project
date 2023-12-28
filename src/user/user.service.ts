import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { Repository } from 'typeorm';

import { ConflictException, Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Role } from './types/userRole.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(email: string, password: string, confirmPassword: string, nickname:string, role:Role, point:number) {

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
  }

  async signin(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = { email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getprofile(userId: number) {
    const user = await this.userRepository.findOne({
      select: ['email', 'nickname','point'],
      where: { 'id':userId },
    });

    if (_.isNil(user)) {
      throw new NotFoundException('사용자 정보가 없습니다.');
    }

    return user;
  }

  async uptprofile(userId: number,nickname:string) {
    const user = await this.userRepository.findOne({
      select: ['email', 'nickname','point'],
      where: { 'id':userId },
    });

    if (_.isNil(user)) {
      throw new NotFoundException('사용자 정보가 없습니다.');
    }

    await this.userRepository.update({ id:userId }, {nickname});
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}