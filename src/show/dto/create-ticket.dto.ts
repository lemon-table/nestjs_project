import { IsNumber, IsNotEmpty, IsString} from 'class-validator';


export class CreateTicketDto {
  @IsString()
  @IsNotEmpty({ message: '등급을 입력해주세요.' })
  grade: string;

  @IsNumber()
  @IsNotEmpty({ message: '공연좌석을 입력해주세요.' })
  seat_num: number;
}
