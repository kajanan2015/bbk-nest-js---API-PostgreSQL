//by Abi - 28/03/2023
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './create-employee.dto';
import { UpdateEmployeeDto } from './update-employee.dto';
import { Employee } from './employee.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from '../user/user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService,private readonly userService:UserService) {}

  //create employee
  @Post()
  async create(@Body() createEmployeeDto: CreateUserDto) {
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
      updateEmployeeStatusDto.status.toString(),
    );
  }

  //get all employee
  @Get('subadmin/:id')
  async findAllsubadmin(@Param('id') comid: number): Promise<Employee[]> {
    return this.employeeService.findAllsubadmin(+comid);
  }

  @Get()
  async findAll() {
    const response=await this.userService.findAll()
    return response;
  }

  //get employee by id
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.employeeService.findOne(+id);
  }

}
