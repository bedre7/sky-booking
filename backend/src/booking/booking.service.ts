import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prismaService: PrismaService) {}

  async getByUserId(userId: number) {
    const bookings = await this.prismaService.booking.findMany({
      where: {
        userId,
      },
      include: {
        flight: {
          include: {
            route: true,
          },
        },
        seat: true,
      },
    });

    return bookings.map((booking) => {
      return {
        id: booking.id,
        origin: booking.flight.route.origin,
        destination: booking.flight.route.destination,
        departureTime: booking.flight.departureTime,
        arrivalTime: booking.flight.arrivalTime,
        seatNumber: booking.seat.seatNumber,
      };
    });
  }

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

    await this.prismaService.booking.create({
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

    return this.getTicket(userId, seatId, flightId);
  }

  private async getTicket(userId: number, seatId: number, flightId: number) {
    const ticket = await this.prismaService.booking.findFirst({
      where: {
        userId,
        seatId,
        flightId,
      },
      include: {
        flight: {
          include: {
            route: true,
          },
        },
        seat: true,
      },
    });

    return {
      id: ticket.id,
      origin: ticket.flight.route.origin,
      destination: ticket.flight.route.destination,
      departureTime: ticket.flight.departureTime,
      arrivalTime: ticket.flight.arrivalTime,
      seatNumber: ticket.seat.seatNumber,
    };
  }
}
