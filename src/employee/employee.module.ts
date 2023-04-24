import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';


import { CompaniesService } from 'src/companies/companies.service';

import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ UserModule],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {}

