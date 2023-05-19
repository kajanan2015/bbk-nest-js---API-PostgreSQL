import { Module } from '@nestjs/common';
import { MobileAccidentImageService } from './mobile-accident-image.service';
import { MobileAccidentImageController } from './mobile-accident-image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bodymark } from './mobile-accident-image.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { TripService } from 'src/trip/trip.service';
import { TripEntity } from 'src/trip/trip.entity';
import { TripModule } from 'src/trip/trip.module';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { VehicleService } from 'src/vehicle/vehicle.service';
@Module({
  imports:[TypeOrmModule.forFeature([Bodymark,TripEntity,Vehicle]),TripModule,VehicleModule],
  controllers: [MobileAccidentImageController],
  providers: [MobileAccidentImageService,ImageUploadService,TripService,VehicleService]
})
export class MobileAccidentImageModule {}
