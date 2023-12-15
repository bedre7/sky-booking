import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRouteDto {
  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  destination: string;
}
