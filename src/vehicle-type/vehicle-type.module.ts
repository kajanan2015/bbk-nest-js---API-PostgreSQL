import { Module } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';
import { VehicleTypeController } from './vehicle-type.controller';
import { VehicleTypeEntity } from './vehicle-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from 'src/vehicle/vehicle.entity';


@Module({
  imports: [TypeOrmModule.forFeature([VehicleTypeEntity,Vehicle])],
  controllers: [VehicleTypeController],
  providers: [VehicleTypeService]
})
export class VehicleTypeModule {}
