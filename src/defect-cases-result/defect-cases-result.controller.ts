import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DefectCasesResultService } from './defect-cases-result.service';
import { CreateDefectCasesResultDto } from './create-defect-cases-result.dto';
import { UpdateDefectCasesResultDto } from './update-defect-cases-result.dto';

@Controller('defect-cases-result')
export class DefectCasesResultController {
  constructor(private readonly defectCasesResultService: DefectCasesResultService) {}

  @Post()
  create(@Body() createDefectCasesResultDto: CreateDefectCasesResultDto) {
    return this.defectCasesResultService.create(createDefectCasesResultDto);
  }

  @Get()
  findAll() {
    return this.defectCasesResultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.defectCasesResultService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDefectCasesResultDto: UpdateDefectCasesResultDto) {
    return this.defectCasesResultService.update(+id, updateDefectCasesResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.defectCasesResultService.remove(+id);
  }
}
