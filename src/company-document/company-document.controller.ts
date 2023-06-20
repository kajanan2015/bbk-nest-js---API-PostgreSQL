import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CompanyDocumentService } from './company-document.service';
import { CreateCompanyDocumentDto } from './create-company-document.dto';
import { UpdateCompanyDocumentDto } from './update-company-document.dto';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('company-document')
export class CompanyDocumentController {
  constructor(private readonly companyDocumentService: CompanyDocumentService) {}
// company document upload
  @Post()
  create(@Body() createCompanyDocumentDto: CreateCompanyDocumentDto) {
    return this.companyDocumentService.create(createCompanyDocumentDto);
  }
// company document find all 
  @Get()
  findAll() {
    return this.companyDocumentService.findAll();
  }
// company document find  by company id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyDocumentService.findOne(+id);
  }
// update company document
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDocumentDto: UpdateCompanyDocumentDto) {
    return this.companyDocumentService.update(+id, updateCompanyDocumentDto);
  }
// delete company document
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyDocumentService.remove(+id);
  }
}
