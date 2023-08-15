import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './create-department.dto';
import { UpdateDepartmentDto } from './update-department.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) { }

  // ** Create department
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    const department = this.departmentsService.create(createDepartmentDto);

    const successResponse = {
      success: true,
      data: department,
      message: 'success',
    };

    return successResponse;
  }

  // find all accident details
  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }

  // ** Fetch one depatment
  @Get('/:id')
  findOneDepartment(@Param('id') id: number) {
    return this.departmentsService.findOneDepartment(+id);
  }

  // ** Get departments belongs to a company id
  @Get('one-department/:id')
  findDepartments(@Param('id') id: number) {
    return this.departmentsService.findDepartmentsByCompanyId(+id);
  }

  // ** Update department
  @Patch(':id')
  update(@Param('id') id: number, @Body() createDepartmentDto: CreateDepartmentDto) {
    const department = this.departmentsService.update(+id, createDepartmentDto);
    const successResponse = {
      success: true,
      data: department,
      message: 'success',
    };

    return successResponse;
  }
}
