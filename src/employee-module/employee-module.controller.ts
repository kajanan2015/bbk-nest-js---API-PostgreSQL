import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, UseInterceptors, UploadedFiles } from '@nestjs/common';
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
    console.log(filename);
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeModuleDto) {
    return this.employeeModuleService.update(+id, updateEmployeeModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeModuleService.remove(+id);
  }
}
