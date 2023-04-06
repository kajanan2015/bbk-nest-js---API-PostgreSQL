//by Abi - 28/03/2023
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './create-employee.dto';
import { UpdateEmployeeDto } from './update-employee.dto';
import { Employee } from './employee.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
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
  @Put('edit/:id')
  update(@Param('id') id: number, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Patch('status/:id')
  async updateEmployeeStatus(
    @Param('id') id: number,
    @Body() updateEmployeeStatusDto: UpdateEmployeeDto,
  ): Promise<void> {
    await this.employeeService.updateEmployeeStatus(
      id,
      updateEmployeeStatusDto.employeeStatus.toString(),
    );
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
