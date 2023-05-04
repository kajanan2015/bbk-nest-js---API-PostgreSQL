import { Module } from '@nestjs/common';
import { DefectCasesResultService } from './defect-cases-result.service';
import { DefectCasesResultController } from './defect-cases-result.controller';
import { DefectCasesResult } from './defect-cases-result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { DefectTrip } from 'src/defect-trip/defect-trip.entity';
import { defectCases } from 'src/defect-cases/defect-case.entity';
@Module({
  imports:[TypeOrmModule.forFeature([DefectCasesResult, DefectTrip,defectCases])],
  controllers: [DefectCasesResultController],
  providers: [DefectCasesResultService,ImageUploadService]
})
export class DefectCasesResultModule {}
