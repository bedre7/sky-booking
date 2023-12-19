import { IsNumber } from 'class-validator';

class CreateBookingDto {
  @IsNumber()
  flightId: number;

  @IsNumber()
  seatId: number;
}

export default CreateBookingDto;
