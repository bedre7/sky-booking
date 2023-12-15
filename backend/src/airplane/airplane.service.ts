import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAirplaneDto } from './dto/airplane.dto';

@Injectable()
export class AirplaneService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateAirplaneDto) {
    return this.prismaService.airplane.create({
      data: {
        name: dto.name,
        model: dto.model,
        capacity: dto.capacity,
      },
    });
  }

  async getAllAirplanes() {
    return this.prismaService.airplane.findMany();
  }
}
