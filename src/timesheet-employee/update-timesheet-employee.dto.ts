import { PartialType } from '@nestjs/mapped-types';
import { CreateTimesheetEmployeeDto } from './create-timesheet-employee.dto';

export class UpdateTimesheetEmployeeDto extends PartialType(CreateTimesheetEmployeeDto) {}
