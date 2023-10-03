import { Module } from '@nestjs/common';
import { DefectCasesService } from './defect-cases.service';
import { DefectCasesController } from './defect-cases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { defectCases } from './defect-case.entity';
import { DefectCasesResult } from 'src/defect-cases-result/defect-cases-result.entity';

@Module({
  imports:[TypeOrmModule.forFeature([defectCases,DefectCasesResult])],
  controllers: [DefectCasesController],
  providers: [DefectCasesService]
})
export class DefectCasesModule {}
