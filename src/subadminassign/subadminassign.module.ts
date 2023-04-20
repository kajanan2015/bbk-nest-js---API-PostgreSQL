import { Module } from '@nestjs/common';
import { SubadminassignService } from './subadminassign.service';
import { SubadminassignController } from './subadminassign.controller';
import { EmployeeService } from 'src/employee/employee.service';
@Module({
  controllers: [SubadminassignController],
  providers: [SubadminassignService]
})
export class SubadminassignModule {}
