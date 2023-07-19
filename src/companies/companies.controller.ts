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

// decativate schedule-this call from lamda function-no need auth
  @Post("scheduledeactivate")
  async scheduledeactivatecustomer() {
    const currentDateTime = new Date();

    console.log(currentDateTime.toISOString(), 343434);
    return await this.service.scheduledeactivate()
  }


  // create company
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(@UploadedFiles() file, @Body() companyData, @Req() req) {
    
    const base_url=`${req.get('origin')}/`;
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
    return await this.service.create(data,base_url);
   

  }


// show all companies
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async showAll() {
    const companies = await this.service.showAll();
    return {
      statusCode: HttpStatus.OK,
      companies
    };
  }
  // return companies related sub comapny when pass main company id
  @UseGuards(AuthGuard('jwt'))
  @Get('showcompanylist/:id')
  async showcompanylist(@Param('id') value: number) {
    const showcompanylist = await this.service.showcompanylist(value)
    return {
      statusCode: HttpStatus.OK,
      showcompanylist
    };
  }

    // show only active/inactive/deactivate main company 
  @UseGuards(AuthGuard('jwt'))
  @Get('/showonlyActivemainCompany/:value')
  async showonlyActivemainCompany(@Param('value') value: number) {
    const companies = await this.service.showonlyActivemainCompany(value);
    return {
      statusCode: HttpStatus.OK,
      companies
    };
  }
  // show only active/inactive/deactivate sub company 
  @UseGuards(AuthGuard('jwt'))
  @Get('/showonlyActiveSubCompany/:value')
  async showonlyActivesubCompany(@Param('value') value: number) {
    const companies = await this.service.showonlyActivesubCompany(value);
    return {
      statusCode: HttpStatus.OK,
      companies
    };
  }
  // show subcompany when pass main company
  @UseGuards(AuthGuard('jwt'))
  @Get('/subcompanies/:mainCompanyId')
  async showSubAll(@Param('mainCompanyId') mainCompanyId: number) {
    const companies = await this.service.showSubAll(mainCompanyId);
    return {
      statusCode: HttpStatus.OK,
      companies
    };
  }
  // module assign
  @UseGuards(AuthGuard('jwt'))
  @Post('assign')
  async assignmodule(@Body() passdata) {
    const data = {
      module: passdata.module,
    }
    return await this.service.assignmodule(passdata.companyId, data)
  }
  // assign package
  @UseGuards(AuthGuard('jwt'))
  @Put('assignpackage')
  async assignpackage(@Body() passdata) {
    console.log(passdata, 88)
    const data = {
      package: passdata.packages,
      customizerecord:passdata.records
    }
    return await this.service.assignpackage(passdata.companyId, data)
  }
  // assign payment method
  @UseGuards(AuthGuard('jwt'))
  @Put('assignpaymentmethod')
  async assignpaymentmethod(@Body() passdata) {
    const data = {
      billing: passdata.paymentMethod,
    }
    return await this.service.assignpaymentmethod(passdata.companyId, data)
  }

  //get assign payment method
  @UseGuards(AuthGuard('jwt'))
  @Get('assignpaymentmethod/:id')
  async getassignpaymentmethod(@Param('id') id: number) {
    return await this.service.getassignpaymentmethod(id)
  }

  // add contract agreement
  @UseGuards(AuthGuard('jwt'))
  @Put('contractagreement')
  async contractagreement(@Body() passdata) {
    const data = {
      contractagreement: passdata.contractagreement,
    }
    return await this.service.contractagreement(passdata.companyId, data)
  }
  // get selected agreement type
  @UseGuards(AuthGuard('jwt'))
  @Get('contractagreement/:id')
  async getcontractagreement(@Param('id') id: number) {
    return await this.service.getcontractagreement(id)
  }
  // get assign package for company
  @UseGuards(AuthGuard('jwt'))
  @Get('assignpackage/:id')
  async getassignpackage(@Param('id') id: number) {
    return await this.service.getassignpackage(id)
  }
// get assign module to the company
  @UseGuards(AuthGuard('jwt'))
  @Get('assign/:id')
  async getassignmodule(@Param('id') id: number) {
    return await this.service.getassignmodule(id)
  }
// show all sub companuies
  @UseGuards(AuthGuard('jwt'))
  @Get('/showsubcompaniesonly')
  async showSubonlyCompanies() {
    const companies = await this.service.showonlySubCompany();
    return {
      statusCode: HttpStatus.OK,
      companies
    };
  }
// return only upload profile image name
  @UseGuards(AuthGuard('jwt'))
  @Post('uploadprofileimage')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadprofileimage(@UploadedFiles() file) {
    console.log(file, 45678)
    const filename = await this.imageUploadService.upload(file, "body");
    console.log(filename, 89989)
    return filename;
  }



  // get company type
  @UseGuards(AuthGuard('jwt'))
  @Get('/companyType')
  async getcompanyType() {
    const companyType = await this.service.getcompanyType();
    return {
      statusCode: HttpStatus.OK,
      companyType
    };
  }
// get country and their currency
  @UseGuards(AuthGuard('jwt'))
  @Get('/country')
  async getcountry() {
    const countries = await this.service.getcountry();
    return {
      statusCode: HttpStatus.OK,
      countries
    };
  }

  // when pass parent company id return sub company
  @UseGuards(AuthGuard('jwt'))
  @Get('getmatchsubcompany/:id')
  async getmatchsubcompany(@Param('id') id: number) {
    const subcompany = await this.service.getmatchsubcompany(id);
    return {
      statusCode: HttpStatus.OK,
      subcompany,
    };
  }
  // individual company data
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async read(@Param('id') id: number) {
    const company = await this.service.read(id);
    console.log(company,888)
    return {
      statusCode: HttpStatus.OK,
      company,
    };
  }

// update company
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


// get companyinfo one by one
@UseGuards(AuthGuard('jwt'))
@Get('/companyinfo/:id')
async getcompnyinfo(@Param('id') companyid: number){
  return await this.service.companyinfoget(companyid);
}


// get history data
@UseGuards(AuthGuard('jwt'))
@Post('/get_history_data/:id')
async getcompnyhistory(@Param('id') companyid: number , @Body() data){
  return await this.service.getcompnyhistory(companyid,data);
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

  // change company status
  @UseGuards(AuthGuard('jwt'))
  @Put('/status/:id')
  async updateCompanyStatus(
    @Param('id') id: number, @Body('compstatus') status,): Promise<CompaniesEntity> {
    return await this.service.updateCompanyStatus(id, status);
  }

  // company assign pageid-not currently used
  @UseGuards(AuthGuard('jwt'))
  @Post('pages/:companyId')
  async addPageToCompany(
    @Param('companyId') companyId: number,
    @Body('pageIds') pageIds,
  ) {
    return await this.service.addPageToCompany(companyId, pageIds);
  }

  // mail testing
  @UseGuards(AuthGuard('jwt'))
  @Post('sendemail')
  async sendemail(@Body() data ,  @Req() req) {
    const base_url=`${req.get('origin')}/`;
    console.log(base_url)
    // return await this.service.testemail();
    return await this.service.sendverifyemail(data,base_url);
  }
  

  // deactivate compnay immediately
  @UseGuards(AuthGuard('jwt'))
  @Put('deactivatecustomerimmediate/:id')
  async deactivatecustomerimmediate(@Param('id') id: number, @Body() data) {
    return await this.service.deactivatecustomerupdateimmediate(id, data);
  }

  // schedule deactivate
  @UseGuards(AuthGuard('jwt'))
  @Put('deactivatecustomer/:id')
  async deactivatecustomer(@Param('id') id: number, @Body() data) {
    return await this.service.deactivatecustomerupdate(id, data);
  }

  // check company code exist or not
  @UseGuards(AuthGuard('jwt'))
  @Post('checkcompanycode/:code')
  async checkcompanycode(@Param('code') code: string) {
    console.log(code)
    return await this.service.checkcompanycode(code);
  }

// activation email verify
  @Get('/activate/:key')
  async activateadmin(@Param('key') key: string){
    return await this.service.decodemyactivatetoken(key);
  }
// genertae payment link
  @UseGuards(AuthGuard('jwt'))
  @Post('generatepaymentlink/:companyid')
  async generatepaymentlink(@Param('companyid') companyid: string, @Req() req) {
    const base_url=`${req.get('origin')}/`;
    return await this.service.generatepaymentlink(companyid,base_url);
  }

  @Get('verifypaymentdetailstoken/:token')
  async verifypaymentdetailstoken(@Param('token') token){
    return await this.service.verifypaymentdetailstoken(token);
  }

  @Get('paiddataupdate/:token')
  async paiddataupdate(@Param('token') token){
    return await this.service.paiddataupdate(token);
  }

  @Post('changeparent:/id')
  async changeparent(@Param('id') id:number, @Body() data:any){
    return await this.service.changeparentadmin(id,data);
  }

  @Put('extend-trial/:id')
  async extendtrial(@Param('id') companyid:number,@Body() data:any){
    console.log(companyid,555);
    console.log(data,444)
    return await this.service.extendtrial(data)
   

  }

  @Put('cancel-trial/:id')
  async cancelrial(@Param('id') companyid:number, @Body() data:any){
    console.log(companyid,555);
    return await this.service.cancelrial(companyid,data)
   

  }


}