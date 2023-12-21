import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Query,
  Get,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { FlightService } from './flight.service';
import CreateFlightDto from './dto/flight.dto';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtGuard, RolesGuard)
@Controller('flight')
export class FlightController {
  constructor(private flightService: FlightService) {}

  @Get('filter')
  async filter(
    @Query() query: { origin: string; destination: string; departure: string },
  ) {
    const { origin, destination, departure } = query;
    return this.flightService.filter(origin, destination, departure);
  }

  @Get('/:id')
  async getDetails(@Param('id', ParseIntPipe) flightId: number) {
    return this.flightService.getDetails(flightId);
  }

  @Get()
  async getAll() {
    return this.flightService.getAll();
  }

  @Post('create')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateFlightDto) {
    return this.flightService.create(dto);
  }
}
