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
  async create(@UploadedFiles() file, @Body() documentData,) {
    const docArray = documentData['data']['doc'];
    const document = await this.imageUploadService.uploadcompany(file, "body");

    const documentPathsArray = [];

    if (document.length > 0 && docArray && docArray.length > 0) {
      for (let i = 0; i < document.length; i++) {
        const docObj: { documentName?: string; documentPath?: string; companyDoc?: CompaniesEntity; } = {};

        if (i < document.length) {
          const documentPath = document[i][Object.keys(document[i])[0]][0];
          docObj.documentPath = documentPath;
        }

        if (i < docArray.length) {
          const documentName = docArray[i].documentName;
          docObj.documentName = documentName;
        }
        docObj.companyDoc = documentData['data'].companyId;
        documentPathsArray.push(docObj);
      }
    }
    return this.companyDocumentService.create(documentPathsArray);
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
