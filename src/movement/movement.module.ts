import { Module } from '@nestjs/common';
import { MovementService } from './movement.service';
import { MovementController } from './movement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movement } from './movement.entity';
import { User } from 'src/user/user.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { VehicleModule } from 'src/vehicle/vehicle.module';
@Module({
  imports: [TypeOrmModule.forFeature([Movement,User,Vehicle]),VehicleModule],
  controllers: [MovementController],
  providers: [MovementService,VehicleService]
})
export class MovementModule {}
