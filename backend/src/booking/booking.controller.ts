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
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtGuard, RolesGuard)
@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post('create')
  @Roles(Role.USER)
  @HttpCode(HttpStatus.CREATED)
  async create(@GetUser('id') userId: number, @Body() dto: CreateBookingDto) {
    return this.bookingService.create(dto.flightId, dto.seatId, userId);
  }

  @Get()
  @Roles(Role.USER)
  async getByUserId(@GetUser('id') userId: number) {
    return this.bookingService.getByUserId(userId);
  }
}
