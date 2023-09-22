import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimesheetEmployeeService } from './timesheet-employee.service';
import { CreateTimesheetEmployeeDto } from './create-timesheet-employee.dto';
import { UpdateTimesheetEmployeeDto } from './update-timesheet-employee.dto';

@Controller('timesheet-employee')
export class TimesheetEmployeeController {
  constructor(private readonly timesheetEmployeeService: TimesheetEmployeeService) {}

  @Post()
  create(@Body() createTimesheetEmployeeDto: CreateTimesheetEmployeeDto) {
    return this.timesheetEmployeeService.create(createTimesheetEmployeeDto);
  }

  @Get()
  findAll() {
    return this.timesheetEmployeeService.findAll();
  }

  @Get('timesheet-employee_get/:id')
  async finddata(@Param('id') id,@Body() data) {
    const start_date=data.start_date;
    const end_date=data.end_date
    return await this.timesheetEmployeeService.finddata(+id,start_date,end_date);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimesheetEmployeeDto: UpdateTimesheetEmployeeDto) {
    return this.timesheetEmployeeService.update(+id, updateTimesheetEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timesheetEmployeeService.remove(+id);
  }
}
