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
  @Get()
  async getAllAirplanes() {
    return this.airplaneService.getAllAirplanes();
  }
}
