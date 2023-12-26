import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAirplaneDto } from './dto/airplane.dto';

const airplaneSelect = {
  id: true,
  name: true,
  model: true,
  capacity: true,
  createdAt: false,
  updatedAt: false,
};
@Injectable()
export class AirplaneService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.airplane.findMany({
      select: airplaneSelect,
    });
  }

  async getAvailable(departureTime: string, arrivalTime: string) {
    return this.prismaService.airplane.findMany({
      where: {
        flights: {
          none: {
            departureTime: {
              lt: new Date(departureTime),
            },
            arrivalTime: {
              gt: new Date(arrivalTime),
            },
          },
        },
      },
      select: airplaneSelect,
    });
  }

  async create(dto: CreateAirplaneDto) {
    const airplane = await this.prismaService.airplane.create({
      data: {
        name: dto.name,
        model: dto.model,
        capacity: dto.capacity,
      },
    });

    const seatNumbers = this.generateSeatNumbers(dto.capacity);

    const seats = seatNumbers.map((seatNumber) => ({
      seatNumber: seatNumber,
      airplaneId: airplane.id,
    }));

    await this.prismaService.seat.createMany({
      data: seats,
    });
  }

  private generateSeatNumbers(capacity: number): string[] {
    const rows = Math.ceil(capacity / 6);
    const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seatNumbers: string[] = [];

    for (let row = 1; row <= rows; row++) {
      for (const letter of seatLetters) {
        const seatNumber = `${row}${letter}`;
        seatNumbers.push(seatNumber);
      }
    }

    return seatNumbers;
  }
}
