import { UserInfo } from 'src/utils/userInfo.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

import {
  Body, Controller, Get, Post, Put, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { UptProfileDto } from './dto/uptprofile.dto';

import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() signupDto: SignUpDto) {
    return await this.userService.signUp(signupDto.email, signupDto.password,signupDto.confirmPassword, signupDto.nickname, signupDto.role, signupDto.point);
  }

  @Post('signin')
  async signIn(@Body() signinDto: SignInDto) {
    return await this.userService.signIn(signinDto.email, signinDto.password);
  }

  @UseGuards(RolesGuard)
  @Get('profile')
  async getProfile(@UserInfo() user: User) {
    return await this.userService.getProfile(user.id);
  }

  @UseGuards(RolesGuard)
  @Put('profile')
  async uptProfile(@UserInfo() user: User, @Body() uptprofileDto: UptProfileDto) {
    return await this.userService.uptProfile(user.id,uptprofileDto.nickname);
  }

  @UseGuards(RolesGuard)
  @Get('ticket')
  async getUserTickets(@UserInfo() user: User) {
    return await this.userService.getUserTickets(user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('email')
  getEmail(@UserInfo() user: User) {
    return { email: user.email };
  }
}