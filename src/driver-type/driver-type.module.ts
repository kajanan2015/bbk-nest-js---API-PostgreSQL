import { Module } from '@nestjs/common';
import { DriverTypeService } from './driver-type.service';
import { DriverTypeController } from './driver-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverTypeEntity } from './driver-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DriverTypeEntity])],
  controllers: [DriverTypeController],
  providers: [DriverTypeService]
})
export class DriverTypeModule {}
