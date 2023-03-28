//by Abi - 28/03/2023
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  //create employee
  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeService.create(createEmployeeDto);
    return {
      statusCode: HttpStatus.OK,
      employee
    };
  }

  //edit employee
  @Put(':id')
  update(@Param('id') id: number, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  //get all employee
  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  //get employee by id
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.employeeService.findOne(+id);
  }

}
