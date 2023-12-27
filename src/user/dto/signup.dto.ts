import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Role } from '../types/userRole.type';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호 확인란을 입력해주세요.' })
  confirmPassword: string;

  @IsString()
  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  nickname: string;

  @IsEnum(Role, { message: 'User, Admin 중 하나만 입력할 수 있습니다.' })
  @IsNotEmpty({ message: '역할을 입력해주세요.' })
  role: Role;

  point:number;
}