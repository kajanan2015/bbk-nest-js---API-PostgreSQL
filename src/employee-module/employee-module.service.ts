import { Injectable } from '@nestjs/common';
import { CreateEmployeeModuleDto } from './create-employee-module.dto';
import { UpdateEmployeeModuleDto } from './update-employee-module.dto';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeModule } from './employee-module.entity';

@Injectable()
export class EmployeeModuleService {
  constructor(
    @InjectRepository(EmployeeModule)
    private employeeModuleRepository: Repository<EmployeeModule>,
    private readonly connection: Connection,
  ) {}

  async create(createEmployeeModuleDto ) {
    const existingEmployeeId = await this.employeeModuleRepository.findOne({where:{employeeId:createEmployeeModuleDto.employeeId}});
     if (existingEmployeeId) {
      return 'Employee ID exist';
     }
    const response=this.employeeModuleRepository.create(createEmployeeModuleDto);
    await this.employeeModuleRepository.save(response);
    return response;
  }

  async getGender(){
    const query = 'SELECT * FROM `gender`';
    const genderList = await this.connection.query(query);
    return genderList;
  }
  async getEmployeeType(){
    const query = 'SELECT * FROM `EmployeeType`';
    const employeeTypeList = await this.connection.query(query);
    return employeeTypeList;
  }
  async getDesignation(){
    const query = 'SELECT * FROM `employeeDesignation`';
    const designationList = await this.connection.query(query);
    return designationList;
  }
  async getCompany(){
    const query = 'SELECT * FROM `company`';
    const companyList = await this.connection.query(query);
    return companyList;
  }

  async getMaritalStatus(){
    const query = 'SELECT * FROM `marital_status`';
    const maritalStatusList = await this.connection.query(query);
    return maritalStatusList;
  }

 async findById(id: number) {
    return await this.employeeModuleRepository.findOne({id});
  }

  // async update(id: number, UpdateEmployeeModuleDto: UpdateEmployeeModuleDto) {
  //   await this.employeeModuleRepository.update({ id }, UpdateEmployeeModuleDto);
  //   return await this.employeeModuleRepository.findOne({ id });
  // }
  async update(id: number, UpdateEmployeeModuleDto: Partial<EmployeeModule>) {
    await this.employeeModuleRepository.update({ id }, UpdateEmployeeModuleDto);
    return await this.employeeModuleRepository.findOne({ id });
  }

  remove(id: number) {
    return `This action removes a #${id} employeeModule`;
  }
  
  async findAll() {
    return await this.employeeModuleRepository.find();
  }
}
