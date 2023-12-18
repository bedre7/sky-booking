import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateFlightDto from './dto/flight.dto';

const flightSelect = {
  id: true,
  departureTime: true,
  arrivalTime: true,
  price: true,
  route: {
    select: {
      origin: true,
      destination: true,
    },
  },
};

@Injectable()
export class FlightService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateFlightDto) {
    return this.prismaService.flight.create({
      data: {
        arrivalTime: new Date(dto.arrivalTime),
        departureTime: new Date(dto.departureTime),
        flightNumber: dto.flightNumber,
        price: dto.price,
        routeId: dto.routeId,
        airplaneId: dto.airplaneId,
      },
      select: flightSelect,
    });
  }

  async getAll() {
    return this.prismaService.flight.findMany({
      select: flightSelect,
    });
  }

  async filter(origin: string, destination: string, departure: string) {
    return this.prismaService.flight.findMany({
      where: {
        route: {
          origin,
          destination,
        },
        departureTime: {
          gte: new Date(departure),
        },
      },
      select: flightSelect,
    });
  }
}
