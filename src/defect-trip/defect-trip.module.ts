import { Module } from '@nestjs/common';
import { DefectTripService } from './defect-trip.service';
import { DefectTripController } from './defect-trip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefectTrip } from './defect-trip.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { DefectCasesResult } from 'src/defect-cases-result/defect-cases-result.entity';
import { TripService } from 'src/trip/trip.service';
import { TripModule } from 'src/trip/trip.module';
import { TripEntity } from 'src/trip/trip.entity';
import { defectCases } from 'src/defect-cases/defect-case.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { VehicleModule } from 'src/vehicle/vehicle.module';
@Module({
  imports:[TypeOrmModule.forFeature([DefectTrip, DefectCasesResult,TripEntity,defectCases,Vehicle]),TripModule,VehicleModule],
  controllers: [DefectTripController],
  providers: [DefectTripService, ImageUploadService,TripService, VehicleService]
})
export class DefectTripModule {}
