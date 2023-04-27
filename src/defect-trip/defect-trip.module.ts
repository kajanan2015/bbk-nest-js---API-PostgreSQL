import { Module } from '@nestjs/common';
import { DefectTripService } from './defect-trip.service';
import { DefectTripController } from './defect-trip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefectTrip } from './defect-trip.entity';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { DefectCasesResult } from 'src/defect-cases-result/defect-cases-result.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DefectTrip, DefectCasesResult])],
  controllers: [DefectTripController],
  providers: [DefectTripService, ImageUploadService]
})
export class DefectTripModule {}
