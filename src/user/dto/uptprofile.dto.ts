import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class UptProfileDto {
  @IsString()
  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  nickname: string;
}