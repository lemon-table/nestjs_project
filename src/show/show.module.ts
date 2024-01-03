import { Module } from '@nestjs/common';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Show } from './entities/show.entity';
import { Seat } from './entities/seat.entity';

import { Ticket } from './entities/ticket.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Show,Seat,Ticket,User])],
  providers: [ShowService],
  controllers: [ShowController]
})
export class ShowModule {}
