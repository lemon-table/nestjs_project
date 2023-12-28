import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';
import { UserInfo } from 'src/utils/userInfo.decorator';

import {
  Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors
} from '@nestjs/common';

import { CreateShowDto } from './dto/create-show.dto';
import { ShowService } from './show.service';

import { User } from '../user/entities/user.entity';


@UseGuards(RolesGuard)
@Controller('shows')
export class ShowController {
    constructor(private readonly showService: ShowService) {}

    @Roles(Role.Admin)
    @Post()
    async createShow(@UserInfo() user: User,@Body() createshowDto: CreateShowDto) {
      return await this.showService.createShow(user.id,createshowDto.show_name,createshowDto.show_date,createshowDto.show_time,createshowDto.show_description,createshowDto.show_category,createshowDto.show_location, createshowDto.seatInfo);
    }

    @Get()
    async findAllShow() {
      return await this.showService.findAllShow();
    }

    @Get(':showId/ticket')
    async findTicket(@Param('showId') showId: number) {
      console.log('showId:'+showId);
      return await this.showService.findTicket(showId);
    }

    @Get(':showId')
    async findOneShow(@Param('showId') showId: number) {
      return await this.showService.findOneShow(showId);
    }
}
