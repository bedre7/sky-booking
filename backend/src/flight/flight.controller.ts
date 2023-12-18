import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Query,
  Get,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { FlightService } from './flight.service';
import CreateFlightDto from './dto/flight.dto';

@UseGuards(JwtGuard)
@Controller('flight')
export class FlightController {
  constructor(private flightService: FlightService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll() {
    return this.flightService.getAll();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async create(@Body() dto: CreateFlightDto) {
    return this.flightService.create(dto);
  }

  @Get('filter')
  async filter(
    @Query() query: { origin: string; destination: string; departure: string },
  ) {
    const { origin, destination, departure } = query;
    return this.flightService.filter(origin, destination, departure);
  }
}
