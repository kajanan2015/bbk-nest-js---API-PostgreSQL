import { Module } from '@nestjs/common';
import { DefectCasesService } from './defect-cases.service';
import { DefectCasesController } from './defect-cases.controller';

@Module({
  controllers: [DefectCasesController],
  providers: [DefectCasesService]
})
export class DefectCasesModule {}
