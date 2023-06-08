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
  Req,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { AuthGuard } from '@nestjs/passport';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from 'src/imageupload/imageupload.service';
import { CompaniesEntity } from './companies.entity';

@Controller('companies')
export class CompaniesController {
  constructor(
    private service: CompaniesService,
    private readonly imageUploadService: ImageUploadService) { }


  @Post("scheduledeactivate")
  async scheduledeactivatecustomer() {
    const currentDateTime = new Date();

    console.log(currentDateTime.toISOString(), 343434);
    return await this.service.scheduledeactivate()
  }


  @UseGuards(AuthGuard('jwt'))
  @Get()
  async showAll() {
    const companies = await this.service.showAll();
    return {
      statusCode: HttpStatus.OK,
      companies
    };
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('showcompanylist/:id')
  async showcompanylist(@Param('id') value: number) {
    const showcompanylist = await this.service.showcompanylist(value)
    return {
      statusCode: HttpStatus.OK,
      showcompanylist
    };
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/showonlyActivemainCompany/:value')
  async showonlyActivemainCompany(@Param('value') value: number) {
    const companies = await this.service.showonlyActivemainCompany(value);
    return {
      statusCode: HttpStatus.OK,
      companies
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/showonlyActiveSubCompany/:value')
  async showonlyActivesubCompany(@Param('value') value: number) {
    const companies = await this.service.showonlyActivesubCompany(value);
    return {
      statusCode: HttpStatus.OK,
      companies
    };
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/subcompanies/:mainCompanyId')
  async showSubAll(@Param('mainCompanyId') mainCompanyId: number) {
    const companies = await this.service.showSubAll(mainCompanyId);
    return {
      statusCode: HttpStatus.OK,
      companies
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('assign')
  async assignmodule(@Body() passdata){
    const data={
      module:passdata.module,
    }
    return await this.service.assignmodule(passdata.companyId,data)
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('assignpackage')
  async assignpackage(@Body() passdata){
    const data={
      package:passdata.packageId,
    }
    return await this.service.assignpackage(passdata.companyId,data)
  }

  

  @UseGuards(AuthGuard('jwt'))
  @Put('contractagreement')
  async contractagreement(@Body() passdata){
    const data={
      contractagreement:passdata.contractagreement,
    }
    return await this.service.contractagreement(passdata.companyId,data)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('contractagreement/:id')
  async getcontractagreement(@Param('id') id: number){
    return await this.service.getcontractagreement(id)
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get('assignpackage/:id')
  async getassignpackage(@Param('id') id: number){
    return await this.service.getassignpackage(id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('assign/:id')
  async getassignmodule(@Param('id') id: number){
    return await this.service.getassignmodule(id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/showsubcompaniesonly')
  async showSubonlyCompanies() {
    const companies = await this.service.showonlySubCompany();
    return {
      statusCode: HttpStatus.OK,
      companies
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('uploadprofileimage')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadprofileimage(@UploadedFiles() file) {
   console.log(file,45678)
   const filename = await this.imageUploadService.upload(file, "body");
  console.log(filename,89989)
   return filename;
  }



  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(@UploadedFiles() file, @Body() companyData) {
    console.log(companyData,1234567890)
    const filename = await this.imageUploadService.uploadcompany(file, "body");

    const img = filename.find((file) => file.hasOwnProperty(`logoImg`));
    const logoImg = img ? img['logoImg'][0] : null;

    const document = filename.find((file) => file[`files[]`]);
    const filesArray = document ? document[`files[]`] : null;

    const data = {
      ...companyData,
      logoImg: logoImg,
      file: filesArray,
    }
    console.log(data, 1111111111111111)
    return await this.service.create(data);
    //  return filename

  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/companyType')
  async getcompanyType() {
    const companyType = await this.service.getcompanyType();
    return {
      statusCode: HttpStatus.OK,
      companyType
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/country')
  async getcountry() {
    const countries = await this.service.getcountry();
    return {
      statusCode: HttpStatus.OK,
      countries
    };
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('getmatchsubcompany/:id')
  async getmatchsubcompany(@Param('id') id: number) {
    const subcompany = await this.service.getmatchsubcompany(id);
    return {
      statusCode: HttpStatus.OK,
      subcompany,
    };
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async read(@Param('id') id: number) {
    const company = await this.service.read(id);
    return {
      statusCode: HttpStatus.OK,
      company,
    };
  }


  @UseGuards(AuthGuard('jwt'))
  @Patch('/edit/:id')
  @UseInterceptors(AnyFilesInterceptor())
  async update(@Param('id') id: number, @UploadedFiles() file, @Body() companyData) {

    console.log(companyData, 787878)
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
  @UseGuards(AuthGuard('jwt'))
  @Put('/status/:id')
  async updateCompanyStatus(
    @Param('id') id: number, @Body('compstatus') status,): Promise<CompaniesEntity> {
    return await this.service.updateCompanyStatus(id, status);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('pages/:companyId')
  async addPageToCompany(
    @Param('companyId') companyId: number,
    @Body('pageIds') pageIds,
  ) {
    return await this.service.addPageToCompany(companyId, pageIds);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('sendemail')
  async sendemail() {
    return await this.service.testemail();
  }
  @UseGuards(AuthGuard('jwt'))
  @Put('deactivatecustomerimmediate/:id')
  async deactivatecustomerimmediate(@Param('id') id: number, @Body() data) {
    return await this.service.deactivatecustomerupdateimmediate(id, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('deactivatecustomer/:id')
  async deactivatecustomer(@Param('id') id: number, @Body() data) {
    return await this.service.deactivatecustomerupdate(id, data);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Post('checkcompanycode/:code')
  async checkcompanycode(@Param('code') code: string) {
    console.log(code)
    return await this.service.checkcompanycode(code);
  }

}