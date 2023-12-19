import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prismaService: PrismaService) {}

  async create(flightId: number, seatId: number, userId: number) {
    const flightExists = await this.prismaService.flight.findFirst({
      where: {
        id: flightId,
      },
    });

    if (!flightExists) {
      throw new BadRequestException({
        message: 'Flight not found',
      });
    }

    const isSeatBooked = await this.prismaService.booking.findFirst({
      where: {
        seatId,
        flightId,
      },
    });

    if (isSeatBooked) {
      throw new BadRequestException({
        message: 'Seat already booked',
      });
    }

    const seatExists = await this.prismaService.seat.findFirst({
      where: {
        id: seatId,
      },
    });

    if (!seatExists) {
      throw new BadRequestException({
        message: 'Seat not found',
      });
    }

    return this.prismaService.booking.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        seat: {
          connect: {
            id: seatId,
          },
        },
        flight: {
          connect: {
            id: flightId,
          },
        },
      },
    });
  }
}
