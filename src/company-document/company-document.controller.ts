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
    const existing = await this.companyDocumentService.findByDocumentName(documentName);

    if (existing) {
      await this.companyDocumentService.updateStatus(existing.documentName, false);
    }

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
  findByCompanyId(@Param('id') id: string) {
    return this.companyDocumentService.findByCompanyId(+id);
  }

  // ** Customer document history find by document name
  @Get('document-history/:documentName')
  findDocHistory(@Param('documentName') documentName: string) {
    return this.companyDocumentService.findDocHistory(documentName);
  }

  // ** Check document name existing
  @Post('document-name')
  async checkemailexist(@Body() data: any) {
    const documentName = Object.keys(data)[0]
    const existing = await this.companyDocumentService.findByDocumentName(documentName);
    if (existing) {
      return "name exist";
    } else {
      return 'name not exist'
    }
  }
}
