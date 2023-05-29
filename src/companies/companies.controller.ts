import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Body,
  Param,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { AuthGuard } from '@nestjs/passport';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { CompaniesEntity } from './companies.entity';
@UseGuards(AuthGuard('jwt'))
@Controller('companies')
export class CompaniesController {
  constructor(
    private service: CompaniesService,
    private readonly imageUploadService: ImageUploadService) { }

  @Get()
  async showAll() {
    const companies = await this.service.showAll();
    return {
      statusCode: HttpStatus.OK,
      companies
    };
  }

@Get('showcompanylist/:id')
async showcompanylist(@Param('id') value:number)
{
  const showcompanylist= await this.service.showcompanylist(value)
  return {
    statusCode: HttpStatus.OK,
    showcompanylist
  };
}
  @Get('/showonlyActivemainCompany/:value')
  async showonlyActivemainCompany(@Param('value') value: number) {
    const companies = await this.service.showonlyActivemainCompany(value);
    return {
      statusCode: HttpStatus.OK,
      companies
    };
  }


  @Get('/showonlyActiveSubCompany/:value')
  async showonlyActivesubCompany(@Param('value') value: number) {
    const companies = await this.service.showonlyActivesubCompany(value);
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

  @Get('/showsubcompaniesonly')
  async showSubonlyCompanies() {
    const companies = await this.service.showonlySubCompany();
    return {
      statusCode: HttpStatus.OK,
      companies
    };
  }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(@UploadedFiles() file, @Body() companyData) {
    const filename = await this.imageUploadService.uploadcompany(file, "body");
    const data = {
      ...companyData,
      "filename": filename
    }
    return await this.service.create(data);
  //  return filename
 
  }

  @Get('/companyType')
  async getcompanyType(){
    const companyType = await this.service.getcompanyType();
    return {
      statusCode: HttpStatus.OK,
      companyType
    };
  }


  @Get('/country')
  async getcountry(){
    const countries = await this.service.getcountry();
    return {
      statusCode: HttpStatus.OK,
      countries
    };
  }

  @Get('getmatchsubcompany/:id')
  async getmatchsubcompany(@Param('id') id: number) {
    const subcompany = await this.service.getmatchsubcompany(id);
    return {
      statusCode: HttpStatus.OK,
      subcompany,
    };
  }

  @Get(':id')
  async read(@Param('id') id: number) {
    const company = await this.service.read(id);
    return {
      statusCode: HttpStatus.OK,
      company,
    };
  }

  

  @Patch('/edit/:id')
  @UseInterceptors(AnyFilesInterceptor())
  async update(@Param('id') id: number, @UploadedFiles() file, @Body() companyData) {

console.log(companyData,787878)
console.log(id,909099090)
console.log(file,89898989)    
    const filename = await this.imageUploadService.uploadcompany(file, "body");
    const data = {
      ...companyData,
       filename
    }
    // console.log(data,8090909)
    // let data = { ...companyData };
    // if (file && Array.isArray(file) && file.length === 0) {
    //   const { companyLogo, companyStatus, ...companyDataWithoutLogo } = companyData;
    //   data = {
    //     ...companyDataWithoutLogo,
    //   }
    // } else {
    //   const filename = await this.imageUploadService.upload(file, "body");
    //   const { companyStatus, ...companyDataWithoutStatus } = companyData;
    //   data = {
    //     ...companyDataWithoutStatus,
    //     "companyLogo": filename[0]
    //   }
    // }
    return await this.service.update(id, data);
  }

  // @Put('/edit/:id')
  // @UseInterceptors(AnyFilesInterceptor())
  // async updateStatus(@Param('id') id: number, @UploadedFiles() file, @Body() companyData) {
  //   console.log(companyData,11)
  //   let data = { ...companyData };
  //   if (file && Array.isArray(file) && file.length === 0) {
  //     const { companyLogo, ...companyDataWithoutLogo } = companyData;
  //     data = {
  //       ...companyDataWithoutLogo,
  //     }
  //   } else {
  //     const filename = await this.imageUploadService.upload(file, "body");
  //     const { ...companyDataWithoutStatus } = companyData;
  //     data = {
  //       ...companyDataWithoutStatus,
  //       "companyLogo": filename[0]
  //     }
  //   }
  //   return await this.service.update(id, data);
  // }

  @Put('/status/:id')
  async updateCompanyStatus(
    @Param('id') id: number,  @Body('compstatus') status,): Promise<CompaniesEntity> {
    return await this.service.updateCompanyStatus(id,status);
  }

  @Post('pages/:companyId')
  async addPageToCompany(
    @Param('companyId') companyId: number,
    @Body('pageIds') pageIds,
  ) {
    await this.service.addPageToCompany(companyId, pageIds);
  }

  @Post('sendemail')
  async sendemail() {
    await this.service.testemail();
  }
}