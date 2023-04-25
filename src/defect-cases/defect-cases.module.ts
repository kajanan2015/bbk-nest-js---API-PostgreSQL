import { Module } from '@nestjs/common';
import { DefectCasesService } from './defect-cases.service';
import { DefectCasesController } from './defect-cases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { defectCases } from './defect-case.entity';


@Module({
  imports:[TypeOrmModule.forFeature([defectCases])],
  controllers: [DefectCasesController],
  providers: [DefectCasesService]
})
export class DefectCasesModule {}
