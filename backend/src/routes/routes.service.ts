import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRouteDto } from './dto/route.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class RoutesService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateRouteDto) {
    try {
      if (dto.origin === dto.destination) {
        throw new BadRequestException({
          message: 'Origin and destination cannot be the same',
        });
      }

      const res = await this.prismaService.routes.create({
        data: {
          origin: dto.origin,
          destination: dto.destination,
        },
      });

      return res;
    } catch (error) {
      // check if the [origin, destination] pair is unique
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException({
            message: 'Route already exists',
          });
        }
      }

      throw error;
    }
  }

  async getAllRoutes() {
    return this.prismaService.routes.findMany();
  }
}
