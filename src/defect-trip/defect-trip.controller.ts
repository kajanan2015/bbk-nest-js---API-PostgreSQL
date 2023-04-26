import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DefectTripService } from './defect-trip.service';
import { CreateDefectTripDto } from './dto/create-defect-trip.dto';
import { UpdateDefectTripDto } from './dto/update-defect-trip.dto';

@Controller('defect-trip')
export class DefectTripController {
  constructor(private readonly defectTripService: DefectTripService) {}

  @Post()
  create(@Body() createDefectTripDto: CreateDefectTripDto) {
    return this.defectTripService.create(createDefectTripDto);
  }

  @Get()
  findAll() {
    return this.defectTripService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.defectTripService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDefectTripDto: UpdateDefectTripDto) {
    return this.defectTripService.update(+id, updateDefectTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.defectTripService.remove(+id);
  }
}
