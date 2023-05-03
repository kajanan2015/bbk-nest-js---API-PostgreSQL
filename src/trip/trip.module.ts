import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { TripEntity } from './trip.entity';
import { User } from 'src/user/user.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';
@Module({
  imports: [TypeOrmModule.forFeature([TripEntity,User,Vehicle])],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}