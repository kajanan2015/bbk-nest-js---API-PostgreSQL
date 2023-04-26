import { Module } from '@nestjs/common';
import { DefectCasesResultService } from './defect-cases-result.service';
import { DefectCasesResultController } from './defect-cases-result.controller';

@Module({
  controllers: [DefectCasesResultController],
  providers: [DefectCasesResultService]
})
export class DefectCasesResultModule {}
