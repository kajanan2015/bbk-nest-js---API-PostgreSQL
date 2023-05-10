import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DefectCasesService } from './defect-cases.service';
import { CreateDefectCaseDto } from './create-defect-case.dto';
import { UpdateDefectCaseDto } from './update-defect-case.dto';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('defect-cases')
export class DefectCasesController {
  constructor(private readonly defectCasesService: DefectCasesService) {}

  @Post()
  create(@Body() createDefectCaseDto: CreateDefectCaseDto) {
    return this.defectCasesService.create(createDefectCaseDto);
  }

  @Get()
  findAll() {
    return this.defectCasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.defectCasesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDefectCaseDto: UpdateDefectCaseDto) {
    return this.defectCasesService.update(+id, updateDefectCaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.defectCasesService.remove(+id);
  }
}
