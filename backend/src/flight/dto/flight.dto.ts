import { IsString, IsNumber } from 'class-validator';

class CreateFlightDto {
  @IsString()
  arrivalTime: string;

  @IsString()
  departureTime: string;

  @IsString()
  flightNumber: string;

  @IsNumber()
  price: number;

  @IsNumber()
  routeId: number;

  @IsNumber()
  airplaneId: number;
}

export default CreateFlightDto;
