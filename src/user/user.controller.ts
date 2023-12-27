import { UserInfo } from 'src/utils/userInfo.decorator';

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
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

  @UseGuards(AuthGuard('jwt'))
  @Get('email')
  getEmail(@UserInfo() user: User) {
    return { email: user.email };
  }
}