import { IsEnum, IsNotEmpty, IsString, IsArray, ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer'; // class-transformer를 사용하여 nested validation을 활성화
import { Role } from '../types/categoryRole.type';

export class SeatInfoDto {
    @IsNotEmpty({ message: '좌석 번호를 입력해주세요.' })
    seat_num: number;
  
    @IsNotEmpty({ message: '등급을 입력해주세요.' })
    grade: string;
  
    @IsNotEmpty({ message: '가격을 입력해주세요.' })
    seat_price: number;
  }

export class CreateShowDto {
  @IsString()
  @IsNotEmpty({ message: '공연명을 입력해주세요.' })
  show_name: string;

  @IsString()
  @IsNotEmpty({ message: '공연날짜를 입력해주세요.' })
  show_date: string;

  @IsString()
  @IsNotEmpty({ message: '공연시각을 입력해주세요.' })
  show_time: string;

  @IsString()
  @IsNotEmpty({ message: '공연정보를 입력해주세요.' })
  show_description: string;

  @IsEnum(Role, { message: 'Theater, Music, Dance 중 하나만 입력할 수 있습니다.' })
  @IsNotEmpty({ message: '공연 카테고리를 입력해주세요.' })
  show_category: Role;

  @IsString()
  @IsNotEmpty({ message: '공연장소를 입력해주세요.' })
  show_location: string;

  @IsArray()
  @ValidateNested({ each: true }) // 각각의 요소에 대한 nested validation 활성화
  @Type(() => SeatInfoDto)
  seatInfo: SeatInfoDto[];

  show_image: string;
}
