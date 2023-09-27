import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyDutyTypeService } from './company-duty-type.service';
import { CreateCompanyDutyTypeDto } from './create-company-duty-type.dto';
import { UpdateCompanyDutyTypeDto } from './update-company-duty-type.dto';

@Controller('company-duty-type')
export class CompanyDutyTypeController {
  constructor(private readonly companyDutyTypeService: CompanyDutyTypeService) {}

  @Post()
  create(@Body() createCompanyDutyTypeDto: CreateCompanyDutyTypeDto) {
    return this.companyDutyTypeService.create(createCompanyDutyTypeDto);
  }

  @Get()
  findAll() {
    return this.companyDutyTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyDutyTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDutyTypeDto: UpdateCompanyDutyTypeDto) {
    return this.companyDutyTypeService.update(+id, updateCompanyDutyTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyDutyTypeService.remove(+id);
  }
}
