import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DriverTypeService } from './driver-type.service';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
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
