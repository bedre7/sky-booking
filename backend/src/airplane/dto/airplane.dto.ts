import { IsNumber, IsString } from 'class-validator';

export class CreateAirplaneDto {
  @IsString()
  name: string;

  @IsString()
  model: string;

  @IsNumber()
  capacity: number;
}
