import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CompanyDocumentService } from './company-document.service';
import { CreateCompanyDocumentDto } from './create-company-document.dto';
import { UpdateCompanyDocumentDto } from './update-company-document.dto';
import { AuthGuard } from '@nestjs/passport';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { CompaniesEntity } from 'src/companies/companies.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('company-document')
export class CompanyDocumentController {
  constructor(
    private readonly companyDocumentService: CompanyDocumentService,
    private readonly imageUploadService: ImageUploadService) { }

  // ** Customer document upload
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(@UploadedFiles() file, @Body() documentData) {
    const docArray = documentData['data']['doc'];
    const document = await this.imageUploadService.uploadcompany(file, "body");

    const documentPath = document[0]['data[doc][file]'][0];
    const documentName = docArray.documentName;
    const companyDoc = documentData['data'].companyId;

    const data = {
      documentPath,
      documentName,
      companyDoc
    };

    return this.companyDocumentService.create(data);
  }

  // ** Customer document find all
  @Get()
  findAll() {
    return this.companyDocumentService.findAll();
  }

  // ** Customer document find  by company id
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
