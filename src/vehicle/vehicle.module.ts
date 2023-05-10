import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { Vehicle } from './vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleTypeEntity } from 'src/vehicle-type/vehicle-type.entity';
import { TripEntity } from 'src/trip/trip.entity';
import { AccidentUpload } from 'src/accident-upload/accident-upload.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Vehicle,VehicleTypeEntity, TripEntity,AccidentUpload])],
  controllers: [VehicleController],
  providers: [VehicleService]
})
export class VehicleModule {}
