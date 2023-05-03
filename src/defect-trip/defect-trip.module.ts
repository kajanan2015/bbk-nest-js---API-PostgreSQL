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
@Module({
  imports:[TypeOrmModule.forFeature([DefectTrip, DefectCasesResult,TripEntity]),TripModule],
  controllers: [DefectTripController],
  providers: [DefectTripService, ImageUploadService,TripService]
})
export class DefectTripModule {}
