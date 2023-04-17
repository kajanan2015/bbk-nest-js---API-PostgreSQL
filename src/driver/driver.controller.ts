import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './create-driver.dto';
import { UpdateDriverDto } from './update-driver.dto';
import { Put } from '@nestjs/common';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @Get()
  findAll() {
    return this.driverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverService.findById(+id);
  }

  @Put('/edit/:id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(+id, updateDriverDto);
  }
}
