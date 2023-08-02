import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeDataHistoryService } from './employee-data-history.service';
import { CreateEmployeeDataHistoryDto } from './create-employee-data-history.dto';
import { UpdateEmployeeDataHistoryDto } from './update-employee-data-history.dto';

@Controller('employee-data-history')
export class EmployeeDataHistoryController {
  constructor(private readonly employeeDataHistoryService: EmployeeDataHistoryService) {}

  @Post()
  create(@Body() createEmployeeDataHistoryDto: CreateEmployeeDataHistoryDto) {
    return this.employeeDataHistoryService.create(createEmployeeDataHistoryDto);
  }

  @Post('/historybytype')
  findEmpDataHistory(@Body() createEmployeeDataHistoryDto: CreateEmployeeDataHistoryDto) {
    return this.employeeDataHistoryService.findEmpDataHistory(createEmployeeDataHistoryDto);
  }

  @Post('/history-all')
  findAllEmpDataHistory(@Body() createEmployeeDataHistoryDto: CreateEmployeeDataHistoryDto) {
    return this.employeeDataHistoryService.findAllEmpDataHistory(createEmployeeDataHistoryDto);
  }

  @Post('/shedulebytype')
  findEmpDataShedule(@Body() createEmployeeDataHistoryDto: CreateEmployeeDataHistoryDto) {
    return this.employeeDataHistoryService.findEmpDataShedule(createEmployeeDataHistoryDto);
  }

  @Get()
  findAll() {
   // return this.employeeDataHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeDataHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDataHistoryDto: UpdateEmployeeDataHistoryDto) {
    return this.employeeDataHistoryService.update(+id, updateEmployeeDataHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeDataHistoryService.remove(+id);
  }
}
