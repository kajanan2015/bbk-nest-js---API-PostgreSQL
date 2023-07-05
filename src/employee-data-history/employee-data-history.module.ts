import { Module } from '@nestjs/common';
import { EmployeeDataHistoryService } from './employee-data-history.service';
import { EmployeeDataHistoryController } from './employee-data-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeDataHistory } from './employee-data-history.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { CompanyWorkPattern } from 'src/company-work-pattern/company-work-pattern.entity';
@Module({
  imports:[TypeOrmModule.forFeature([EmployeeDataHistory,CompaniesEntity,CompanyWorkPattern])],
  controllers: [EmployeeDataHistoryController],
  providers: [EmployeeDataHistoryService]
})
export class EmployeeDataHistoryModule {}
