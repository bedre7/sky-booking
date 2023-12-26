import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { RoutesModule } from './routes/routes.module';
import { AirplaneModule } from './airplane/airplane.module';
import { FlightModule } from './flight/flight.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    RoutesModule,
    AirplaneModule,
    FlightModule,
    BookingModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
