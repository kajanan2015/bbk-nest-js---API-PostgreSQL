import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { TripEntity } from './trip.entity';
import { User } from 'src/user/user.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { VehicleModule } from 'src/vehicle/vehicle.module';
@Module({
  imports: [TypeOrmModule.forFeature([TripEntity,User,Vehicle]),VehicleModule],
  controllers: [TripController],
  providers: [TripService,VehicleService],
})
export class TripModule {}