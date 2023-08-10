import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, UseInterceptors, UploadedFiles, Put } from '@nestjs/common';
import { EmployeeModuleService } from './employee-module.service';
import { CreateEmployeeModuleDto } from './create-employee-module.dto';
import { AuthGuard } from '@nestjs/passport';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from 'src/imageupload/imageupload.service';

@UseGuards(AuthGuard('jwt'))
@Controller('employee-module')
export class EmployeeModuleController {
  constructor(private readonly employeeModuleService: EmployeeModuleService,
    private readonly imageUploadService: ImageUploadService) {}

  @Get('/gender')
  async getGender(){
    const genderList = await this.employeeModuleService.getGender();
    return {
      statusCode: HttpStatus.OK,
      genderList
    };
  }
  @Get('/getemployeecode/:id')
  async getemployeecode(@Param('id') id: number){
    return await this.employeeModuleService.generateemployeeid(id);
  }
  @Get('/marital-status')
  async getMaritalStatus(){
    const maritalStatusList = await this.employeeModuleService.getMaritalStatus();
    return {
      statusCode: HttpStatus.OK,
      maritalStatusList
    };
  }
  @Get('/visa_type')
  async getVisaType() {
    const visaTypeList = await this.employeeModuleService.getVisaType();
    return {
      statusCode: HttpStatus.OK,
      visaTypeList
    };
  }
  @Get('/employee-type')
  async getEmployeeType(){
    const employeeTypeList = await this.employeeModuleService.getEmployeeType();
    return {
      statusCode: HttpStatus.OK,
      employeeTypeList
    };
  }
  @Get('/employee-designation')
  async getDesignation(){
    const designationList = await this.employeeModuleService.getDesignation();
    return {
      statusCode: HttpStatus.OK,
      designationList
    };
  }
  @Get('/company-name')
  async getCompany(){
    const companyList = await this.employeeModuleService.getCompany();
    return {
      statusCode: HttpStatus.OK,
      companyList
    };
  }
  @Get('/driving-licence-type')
  async getDrivingLicenceType() {
    const drivingLicenceTypeList = await this.employeeModuleService.getDrivingLicenceType();
    return {
      statusCode: HttpStatus.OK,
      drivingLicenceTypeList
    };
  }
  @Get('/payment-frequency')
  async getPaymentFrequency() {
    const paymentFrequencyTypeList = await this.employeeModuleService.getPaymentFrequency();
    return {
      statusCode: HttpStatus.OK,
      paymentFrequencyTypeList
    };
  }
  @Get('/bank')
  async getBank() {
    const bankTypeList = await this.employeeModuleService.getBank();
    return {
      statusCode: HttpStatus.OK,
      bankTypeList
    };
  }

  @Post('/bank')
  async createBank(@Body() bank) {
    const response = await this.employeeModuleService.createBank(bank);
    return {
      statusCode: HttpStatus.OK,
      response
    };
  }

  @Get('/driving-licence-category')
  async getDrivingLicenceCategory() {
    const drivingLicenceCategoryList = await this.employeeModuleService.getDrivingLicenceCategory();
    return {
      statusCode: HttpStatus.OK,
      drivingLicenceCategoryList
    };
  }


  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(@UploadedFiles() file, @Body() createEmployeeModuleDto: CreateEmployeeModuleDto) {
    const filenames = await this.imageUploadService.uploadcompany(file, "body");
   
    if(filenames.length>0){
      createEmployeeModuleDto.profilePic = filenames?.[0]?.['profilePic[]']?.[0];
      // createEmployeeModuleDto.profilePicThumb=await this.imageUploadService.uploadThumbnailToS3(filename[0]['profilePic[]'][0]);
    }
    
    const data = {
      ...createEmployeeModuleDto,
      filenames
    } 

    // console.log(await this.imageUploadService.uploadThumbnailToS3(filename[0]['profilePic[]'][0]))
    return this.employeeModuleService.create(data);
  }

  @Post('payroll-info')
  async createEmployeePayroll(@Body() createEmployeeModuleDto: CreateEmployeeModuleDto) {
    return this.employeeModuleService.createPayrollInfo(createEmployeeModuleDto);
  }

  @Get('payroll-info/:id')
  async getEmployeePayrollData(@Param('id') id: string) {
    console.log('dsfggg');
    const employeePayrollData = await this.employeeModuleService.findEmployeePayrollData(+id);
    return {
      statusCode: HttpStatus.OK,
      employeeList: employeePayrollData
    };
  }

  @Get()
  findAll() {
    return this.employeeModuleService.find();
  }

  @Get('/company-employees/:id')
  async getTableData(@Param('id') id: string) {
    const employeeList = await this.employeeModuleService.findCompanyAllEmployees(+id);;
    return {
      statusCode: HttpStatus.OK,
      employeeList: employeeList
    };
  }

  @Get('/company-employees-docs/:id')
  async getTableDoc(@Param('id') id: string) {
    const employeedocList = await this.employeeModuleService.findCompanyAllEmployeesWithDoc(+id);;
    return {
      statusCode: HttpStatus.OK,
      employeedocList: employeedocList
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeModuleService.findById(+id);
  }

  @Put(':id')
  @UseInterceptors(AnyFilesInterceptor())
  async update(@UploadedFiles() file, @Param('id') id: string,  @Body() updateEmployeeModuleDto) {
    const filenames = await this.imageUploadService.uploadcompany(file, "body");
    if(filenames.length>0){
      updateEmployeeModuleDto.profilePic = filenames?.[0]?.['profilePic[]']?.[0];
      // createEmployeeModuleDto.profilePicThumb=await this.imageUploadService.uploadThumbnailToS3(filename[0]['profilePic[]'][0]);
    }
    const data = {
      ...updateEmployeeModuleDto,
      filenames
    }    
    return this.employeeModuleService.update(id, data);
  }

  @Put('/history/:id')
  @UseInterceptors(AnyFilesInterceptor())
  async updateWithHistory(@UploadedFiles() file, @Param('id') id: string,  @Body() updateEmployeeModuleDto) {
    const filenames = await this.imageUploadService.uploadcompany(file, "body");
    // if(filenames.length>0){
    //   updateEmployeeModuleDto.profilePic = filenames?.[0]?.['profilePic[]']?.[0];
    //   // createEmployeeModuleDto.profilePicThumb=await this.imageUploadService.uploadThumbnailToS3(filename[0]['profilePic[]'][0]);
    // }
    const data = {
      ...updateEmployeeModuleDto,
      filenames
    }
    return this.employeeModuleService.updateWithHistory(id, data);
  }

  @Patch('/history/:id')
  @UseInterceptors(AnyFilesInterceptor())
  async deleteSheduleRecord(@Param('id') id: string,) {
    return this.employeeModuleService.deleteSheduleRecord(id);
  }

   // get latest employee info when passing date
   @UseGuards(AuthGuard('jwt'))
   @Post('getlatestemployeeinfo')
   async getlatestEmployeeInfo( @Body() data){
     return await this.employeeModuleService.findLatestEmployeeInfo(data.empid, data);
   }

   // get latest employee payroll info when passing date
   @UseGuards(AuthGuard('jwt'))
   @Post('get-latest-employee-payrollinfo')
   async getlatestEmployeePayrollInfo( @Body() data){
     return await this.employeeModuleService.findLatestEmployeePayrollInfo(data.empid, data);
   }
 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeModuleService.remove(+id);
  }
  // generate temporary ni number -by nuwan
  @Post('generatetempninumber')
  async tempcreateninumber(@Body() data){
    const birthday = new Date(data.birthday);
    const gender=data.gender;
    const genderCode = gender === 'male' ? 'M' : 'F';
    const temporaryNumber = this.employeeModuleService.generateTemporaryNumber(genderCode, birthday);
    return temporaryNumber;
  }
}
