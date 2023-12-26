import { Module } from '@nestjs/common';
import { AirplaneController } from './airplane.controller';
import { AirplaneService } from './airplane.service';

@Module({
  controllers: [AirplaneController],
  providers: [AirplaneService],
})
export class AirplaneModule {}
