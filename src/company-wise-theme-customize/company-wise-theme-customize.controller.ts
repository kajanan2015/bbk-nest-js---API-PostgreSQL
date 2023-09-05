import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CompanyWiseThemeCustomizeService } from './company-wise-theme-customize.service';
import { CreateCompanyWiseThemeCustomizeDto } from './create-company-wise-theme-customize.dto';
import { UpdateCompanyWiseThemeCustomizeDto } from './update-company-wise-theme-customize.dto';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('company-wise-theme-customize')
export class CompanyWiseThemeCustomizeController {
  constructor(private readonly companyWiseThemeCustomizeService: CompanyWiseThemeCustomizeService) {}

  @Post('create_customizer/:id')
  create(@Body() data,@Param('id') company_id) {
    return this.companyWiseThemeCustomizeService.create(company_id,data);
  }

  @Get()
  findAll() {
    return this.companyWiseThemeCustomizeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyWiseThemeCustomizeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyWiseThemeCustomizeDto: UpdateCompanyWiseThemeCustomizeDto) {
    return this.companyWiseThemeCustomizeService.update(+id, updateCompanyWiseThemeCustomizeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyWiseThemeCustomizeService.remove(+id);
  }
}
