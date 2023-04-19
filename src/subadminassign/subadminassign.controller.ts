import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubadminassignService } from './subadminassign.service';
import { CreateSubadminassignDto } from './create-subadminassign.dto';
import { UpdateSubadminassignDto } from './update-subadminassign.dto';

@Controller('subadminassign')
export class SubadminassignController {
  constructor(private readonly subadminassignService: SubadminassignService) {}

  @Post()
  create(@Body() createSubadminassignDto: CreateSubadminassignDto) {
    return this.subadminassignService.create(createSubadminassignDto);
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
  update(@Param('id') id: string, @Body() updateSubadminassignDto: UpdateSubadminassignDto) {
    return this.subadminassignService.update(+id, updateSubadminassignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subadminassignService.remove(+id);
  }
}
