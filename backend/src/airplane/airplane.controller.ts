import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { AirplaneService } from './airplane.service';
import { CreateAirplaneDto } from './dto/airplane.dto';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from '@prisma/client';

@Controller('airplane')
@UseGuards(JwtGuard, RolesGuard)
export class AirplaneController {
  constructor(private airplaneService: AirplaneService) {}

  @Post('create')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateAirplaneDto) {
    return this.airplaneService.create(dto);
  }

  @Get('available')
  @Roles(Role.ADMIN)
  async getAvailable(
    @Query() query: { departureTime: string; arrivalTime: string },
  ) {
    const { departureTime, arrivalTime } = query;
    return this.airplaneService.getAvailable(departureTime, arrivalTime);
  }

  @Get()
  @Roles(Role.ADMIN)
  async getAll() {
    return this.airplaneService.getAll();
  }
}
