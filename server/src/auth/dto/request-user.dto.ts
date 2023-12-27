import { IsString } from 'class-validator';

export class RequestUserDto {
  @IsString()
  userId: string;
}
