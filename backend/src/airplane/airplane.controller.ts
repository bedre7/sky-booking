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

@UseGuards(JwtGuard)
@Controller('airplane')
export class AirplaneController {
  constructor(private airplaneService: AirplaneService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async create(@Body() dto: CreateAirplaneDto) {
    return this.airplaneService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('available')
  async getAvailable(
    @Query() query: { departureTime: string; arrivalTime: string },
  ) {
    const { departureTime, arrivalTime } = query;
    return this.airplaneService.getAvailable(departureTime, arrivalTime);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll() {
    return this.airplaneService.getAll();
  }
}
