import { Module } from '@nestjs/common';
import { CompanyDutyTypeService } from './company-duty-type.service';
import { CompanyDutyTypeController } from './company-duty-type.controller';

@Module({
  controllers: [CompanyDutyTypeController],
  providers: [CompanyDutyTypeService]
})
export class CompanyDutyTypeModule {}
