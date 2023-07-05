import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CompanyWorkPatternService } from './company-work-pattern.service';
import { CreateCompanyWorkPatternDto } from './create-company-work-pattern.dto';
import { UpdateCompanyWorkPatternDto } from './update-company-work-pattern.dto';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('company-work-pattern')
export class CompanyWorkPatternController {
  constructor(private readonly companyWorkPatternService: CompanyWorkPatternService) {}

  @Post('create-pattern')
  async create(@Body() createCompanyWorkPatternDto: CreateCompanyWorkPatternDto) {
    return this.companyWorkPatternService.create(createCompanyWorkPatternDto);
  }

  @Get()
  async findAll() {
    return this.companyWorkPatternService.findAll();
  }

  @Post('findByname/:name')
  async findByname(@Param('name') name: string,@Body() data) {
    return this.companyWorkPatternService.findbypattername(name,data.company);
  }

  @Get(':id')
 async findOne(@Param('id') id: number) {
    return this.companyWorkPatternService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyWorkPatternDto: UpdateCompanyWorkPatternDto) {
    return this.companyWorkPatternService.update(+id, updateCompanyWorkPatternDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyWorkPatternService.remove(+id);
  }
}
