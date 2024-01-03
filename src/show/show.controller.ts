import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';
import { UserInfo } from 'src/utils/userInfo.decorator';

import {
  Body, Controller, Get, Param, Post, Put, UseGuards, Query
} from '@nestjs/common';

import { CreateShowDto } from './dto/create-show.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';

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
    async findAllShow(@Query('search') search?: string) {
      return await this.showService.findAllShow(search);
    }

    @Get(':showId/ticket')
    async findTicket(@Param('showId') showId: number) {
      return await this.showService.findTicket(showId);
    }

    @Roles(Role.User)
    @Post(':showId/ticket')
    async createTicket(@UserInfo() user: User,@Param('showId') showId: number, @Body() createticketDto : CreateTicketDto) {
      return await this.showService.createTicket(user.id,showId,createticketDto.grade,createticketDto.seat_num);
    }

    @Roles(Role.User)
    @Put(':showId/ticket/:ticketId')
    async updateTicket(@UserInfo() user: User,@Param('showId') showId: number, @Param('ticketId') ticketId: number) {
      return await this.showService.updateTicket(user.id,showId,ticketId);
    }

    @Get(':showId')
    async findOneShow(@Param('showId') showId: number) {
      return await this.showService.findOneShow(showId);
    }
}
