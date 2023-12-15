import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/route.dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('routes')
export class RoutesController {
  constructor(private routesService: RoutesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async create(@Body() dto: CreateRouteDto) {
    return this.routesService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllRoutes() {
    return this.routesService.getAllRoutes();
  }
}
