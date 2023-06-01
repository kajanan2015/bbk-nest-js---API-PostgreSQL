import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeDocumentService } from './employee-document.service';
import { CreateEmployeeDocumentDto } from './create-employee-document.dto';
import { UpdateEmployeeDocumentDto } from './update-employee-document.dto';

@Controller('employee-document')
export class EmployeeDocumentController {
  constructor(private readonly employeeDocumentService: EmployeeDocumentService) {}

  @Post()
  create(@Body() createEmployeeDocumentDto: CreateEmployeeDocumentDto) {
    return this.employeeDocumentService.create(createEmployeeDocumentDto);
  }

  @Get()
  findAll() {
    return this.employeeDocumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeDocumentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDocumentDto: UpdateEmployeeDocumentDto) {
    return this.employeeDocumentService.update(+id, updateEmployeeDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeDocumentService.remove(+id);
  }
}
