import { UserInfo } from 'src/utils/userInfo.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';

import {
  Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors
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
  async signup(@Body() signupDto: SignUpDto) {
    return await this.userService.signup(signupDto.email, signupDto.password,signupDto.confirmPassword, signupDto.nickname, signupDto.role, signupDto.point);
  }

  @Post('signin')
  async signin(@Body() signinDto: SignInDto) {
    return await this.userService.signin(signinDto.email, signinDto.password);
  }

  @UseGuards(RolesGuard)
  @Get('profile')
  async getprofile(@UserInfo() user: User) {
    return await this.userService.getprofile(user.id);
  }

  @UseGuards(RolesGuard)
  @Put('profile')
  async uptprofile(@UserInfo() user: User, @Body() uptprofileDto: UptProfileDto) {
    return await this.userService.uptprofile(user.id,uptprofileDto.nickname);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('email')
  getEmail(@UserInfo() user: User) {
    return { email: user.email };
  }
}