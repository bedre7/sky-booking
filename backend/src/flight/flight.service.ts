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
      where: {
        departureTime: {
          gte: new Date(),
        },
      },
    });
  }

  async getDetails(flightId: number) {
    const flight = await this.prismaService.flight.findUnique({
      where: {
        id: flightId,
      },
      select: { ...flightSelect, airplaneId: true },
    });

    const allSeats = await this.prismaService.seat.findMany({
      where: {
        airplaneId: flight.airplaneId,
      },
    });

    const bookedSeats = await this.getBookedSeats(flightId);

    const seatsStatus = allSeats.map((seat) => {
      return {
        ...seat,
        isAvaliable: !bookedSeats.has(seat.id),
      };
    });

    return {
      ...flight,
      seats: seatsStatus,
    };
  }

  private async getBookedSeats(flightId: number) {
    const bookedSeats = await this.prismaService.booking.findMany({
      where: {
        flightId,
      },
      select: {
        seatId: true,
      },
    });

    return new Set(bookedSeats.map((seat) => seat.seatId));
  }

  async filter(origin: string, destination: string, departure: string) {
    return this.prismaService.flight.findMany({
      where: {
        route: {
          origin: {
            contains: origin,
            mode: 'insensitive',
          },
          destination: {
            contains: destination,
            mode: 'insensitive',
          },
        },
        departureTime: {
          gte: new Date(departure),
        },
      },
      select: flightSelect,
    });
  }
}
