import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookingService } from './booking.service';
import CreateBookingDto from './dto/booking.dto';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async create(@GetUser('id') userId: number, @Body() dto: CreateBookingDto) {
    return this.bookingService.create(dto.flightId, dto.seatId, userId);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getByUserId(@GetUser('id') userId: number) {
    return this.bookingService.getByUserId(userId);
  }
}