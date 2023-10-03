import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,HttpStatus } from '@nestjs/common';
import { SubadminassignService } from './subadminassign.service';
import { CreateEmployeeDto } from '../employee/create-employee.dto';
import { UpdateEmployeeDto } from '../employee/update-employee.dto';
import { AuthGuard } from '@nestjs/passport';
import { Subadminassign } from './subadminassign.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('subadminassign')
export class SubadminassignController {
  constructor(private readonly subadminassignService: SubadminassignService) {}

  @Post()
  async create(@Body() CreateEmployeeDto: CreateEmployeeDto) {
    const employee= await this.subadminassignService.create(CreateEmployeeDto);
    return {
      statusCode: HttpStatus.OK,
      employee
    };
  }

  @Get()
  findAll() {
    return this.subadminassignService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subadminassignService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateEmployeeDto: UpdateEmployeeDto) {
    return this.subadminassignService.update(+id, UpdateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subadminassignService.remove(+id);
  }
}

