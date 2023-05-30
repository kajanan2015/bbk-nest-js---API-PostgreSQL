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
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(@UploadedFiles() file, @Body() createEmployeeModuleDto: CreateEmployeeModuleDto) {
    const filename = await this.imageUploadService.uploadcompany(file, "body");
    createEmployeeModuleDto.profilePic = filename[0]['profilePic[]'];
    createEmployeeModuleDto.profilePicThumb=await this.imageUploadService.uploadThumbnailToS3(filename[0]['profilePic[]'][0]);
    // console.log(await this.imageUploadService.uploadThumbnailToS3(filename[0]['profilePic[]'][0]))
    return this.employeeModuleService.create(createEmployeeModuleDto);
  }

  @Get()
  findAll() {
    return this.employeeModuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeModuleService.findById(+id);
  }

  @Put(':id')
  @UseInterceptors(AnyFilesInterceptor())
  async update(@UploadedFiles() file, @Param('id') id: string,  @Body() updateEmployeeModuleDto) {
    const filename = await this.imageUploadService.uploadcompany(file, "empProvidedCopy");    
    if(filename.length>0){
      updateEmployeeModuleDto.empProvidedCopy = filename[0]['providedCopy[]'][0];
      updateEmployeeModuleDto.empProvidedCopyThumb=await this.imageUploadService.uploadThumbnailToS3(filename[0]['providedCopy[]'][0]);
    }
    return this.employeeModuleService.update(id, updateEmployeeModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeModuleService.remove(+id);
  }
}
