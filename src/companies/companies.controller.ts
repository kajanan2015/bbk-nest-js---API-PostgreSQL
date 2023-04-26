import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CompaniesDTO } from './companies.dto';

import { CompaniesService } from './companies.service';
import { AuthGuard } from '@nestjs/passport';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
@UseGuards(AuthGuard('jwt'))
@Controller('companies')
export class CompaniesController {
  constructor(
    private service: CompaniesService,
    private   readonly imageUploadService: ImageUploadService) { }

  @Get()
  async showAll() {
    const companies = await this.service.showAll();
    return {
      statusCode: HttpStatus.OK,
      companies
    };
  }

  @Get('/subcompanies/:mainCompanyId')
  async showSubAll(@Param('mainCompanyId') mainCompanyId: number) {
    const companies = await this.service.showSubAll(mainCompanyId);
    return {
      statusCode: HttpStatus.OK,
      companies
    };
  }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create( @UploadedFiles() file ,@Body() companyData ) {
    const filename=await this.imageUploadService.upload(file , "body");
    const data={
      ...companyData,
      "companyLogo":filename[0]
    }
    return await this.service.create(data);
  }

  @Get(':id')
  async read(@Param('id') id: number) {
    const company = await this.service.read(id);
    return {
      statusCode: HttpStatus.OK,
      company,
    };
  }

  @Put('/edit/:id')
  @UseInterceptors(AnyFilesInterceptor())
  async update(@Param('id') id: number,@UploadedFiles() file , @Body() companyData) {
    let data = { ...companyData }; 
    if(file && Array.isArray(file) && file.length === 0){
      const { companyLogo, ...companyDataWithoutLogo } = companyData;
      data={
        ...companyDataWithoutLogo,
      }
    }else{
      const filename=await this.imageUploadService.upload(file , "body");
      data={
        ...companyData,
        "companyLogo":filename[0]
      }
    }  
    return await this.service.update(id, data);
  }
}