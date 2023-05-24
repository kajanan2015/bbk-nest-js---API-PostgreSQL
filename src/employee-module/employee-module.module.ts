import { Module } from '@nestjs/common';
import { EmployeeModuleService } from './employee-module.service';
import { EmployeeModuleController } from './employee-module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee-module.entity';
import { EmployeeType } from './employee-type.entity';
import { EmpDesignation } from './employee-designation.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
@Module({
  imports: [TypeOrmModule.forFeature([EmployeeType,EmployeeModule,EmpDesignation,CompaniesEntity])],
  controllers: [EmployeeModuleController],
  providers: [EmployeeModuleService]
})
export class EmployeeModuleModule {}
