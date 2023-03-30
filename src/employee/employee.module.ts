import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from 'src/companies/companies.module';
import { Employee } from './employee.entity';

import { CompaniesService } from 'src/companies/companies.service';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, CompaniesEntity]), CompaniesModule, UserModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, CompaniesService]
})
export class EmployeeModule {}
