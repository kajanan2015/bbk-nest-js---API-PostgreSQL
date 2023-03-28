import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from 'src/companies/companies.module';
import { Employee } from './entities/employee.entity';
import { CompaniesEntity } from 'src/companies/entity/companies.entity';
import { CompaniesService } from 'src/companies/companies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, CompaniesEntity]), CompaniesModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, CompaniesService]
})
export class EmployeeModule {}
