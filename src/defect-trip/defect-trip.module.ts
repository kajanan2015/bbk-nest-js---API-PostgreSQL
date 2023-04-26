import { Module } from '@nestjs/common';
import { DefectTripService } from './defect-trip.service';
import { DefectTripController } from './defect-trip.controller';

@Module({
  controllers: [DefectTripController],
  providers: [DefectTripService]
})
export class DefectTripModule {}
