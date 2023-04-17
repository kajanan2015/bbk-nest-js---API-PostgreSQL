import { Module } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';
import { VehicleTypeController } from './vehicle-type.controller';
import { VehicleTypeEntity } from './vehicle-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [TypeOrmModule.forFeature([VehicleTypeEntity])],
  controllers: [VehicleTypeController],
  providers: [VehicleTypeService]
})
export class VehicleTypeModule {}
