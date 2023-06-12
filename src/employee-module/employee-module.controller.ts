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



  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(@UploadedFiles() file, @Body() createEmployeeModuleDto: CreateEmployeeModuleDto) {
    const filename = await this.imageUploadService.uploadcompany(file, "body");
   
    if(filename.length>0){
      createEmployeeModuleDto.profilePic = filename[0]['profilePic[]'][0];
      createEmployeeModuleDto.profilePicThumb=await this.imageUploadService.uploadThumbnailToS3(filename[0]['profilePic[]'][0]);
    }    
    // console.log(await this.imageUploadService.uploadThumbnailToS3(filename[0]['profilePic[]'][0]))
    return this.employeeModuleService.create(createEmployeeModuleDto);
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeModuleService.findById(+id);
  }

  @Put(':id')
  @UseInterceptors(AnyFilesInterceptor())
  async update(@UploadedFiles() file, @Param('id') id: string,  @Body() updateEmployeeModuleDto) {
    const filenames = await this.imageUploadService.uploadcompany(file, "body");
    const data = {
      ...updateEmployeeModuleDto,
      filenames
    }    
    return this.employeeModuleService.update(id, data);
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
