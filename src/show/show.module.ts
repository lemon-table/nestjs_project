import { Module } from '@nestjs/common';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Show } from './entities/show.entity';
import { Seat } from './entities/seat.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Show,Seat])],
  providers: [ShowService],
  controllers: [ShowController]
})
export class ShowModule {}
