import { Module } from '@nestjs/common';
import { TimesheetEmployeeService } from './timesheet-employee.service';
import { TimesheetEmployeeController } from './timesheet-employee.controller';

@Module({
  controllers: [TimesheetEmployeeController],
  providers: [TimesheetEmployeeService]
})
export class TimesheetEmployeeModule {}
