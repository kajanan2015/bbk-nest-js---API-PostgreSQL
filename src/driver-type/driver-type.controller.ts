import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DriverTypeService } from './driver-type.service';

@Controller('driver-type')
export class DriverTypeController {
  constructor(private readonly driverTypeService: DriverTypeService) {}

  @Get()
  async findAll() {
    return this.driverTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverTypeService.findOne(+id);
  }
}
