//by Abi - 28/03/2023
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniesService } from 'src/companies/companies.service';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './create-employee.dto';
import { CreateUserDto } from 'src/user/user.dto';
import { Employee } from './employee.entity';
import { UpdateEmployeeDto } from './update-employee.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private readonly companiesService: CompaniesService,
    private readonly userService:UserService
  ) {}

  //create employee
  async create(createEmployeeDto: CreateUserDto) {
    const employee = Object.assign(new Employee(), createEmployeeDto);

    const companies = [];
    for (const companyName of createEmployeeDto.companies) {
      const company = await this.companiesService.findById(companyName.id);
      if (!company) {
        throw new NotFoundException(`Company with name '${companyName}' not found`);
      }
      companies.push(company);
    }
    employee.companies = companies;
     // added by nuwan
     const existing = await this.userService.findByEmail(createEmployeeDto.email);
     if (existing) {
       throw new BadRequestException('auth/account-exists');
     }
     const response=await this.userService.create(employee);
   
     return response;
  }
  
  //edit employee
  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.userService.find(id);
    
    if (!employee) {
      throw new NotFoundException(`Employee with ID '${id}' not found`);
    }
  
    Object.assign(employee, updateEmployeeDto);
    const companies = [];
    for (const companyName of updateEmployeeDto.companies) {
      const company = await this.companiesService.findById(companyName.id);
      if (!company) {
        throw new NotFoundException(`Company with name '${companyName}' not found`);
      }
      companies.push(company);
    }
    employee.companies = companies;
    // const employeeupdatedata:any={
    //   "name":updateEmployeeDto.firstName,
    //   "password":updateEmployeeDto.password,
    //   "email":updateEmployeeDto.email
    // }
    // console.log(employeeupdatedata,99999999)
    const response=await this.userService.update(id,employee);
    return response;
  }

  //update employee status
  async updateEmployeeStatus(id: number, status: string): Promise<void> {
    await this.userService.updateUserStatus(id,status)
  }

  //get all employee
  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({ 
      relations: ['companies'],
      where: { employeeStatus: 1 }, 
    });
  }

  //get all employee
  async findAllsubadmin(comid: number): Promise<Employee[]> {
    return this.employeeRepository.find({ 
      relations: ['companies'],
      where: { employeeStatus: 1,parentCompanyid:comid }, 
    });
  }

  //get employee by id
  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne(id, { relations: ['companies'] });
    if (!employee) {
      throw new NotFoundException(`Employee with ID '${id}' not found`);
    }
    return employee;
  } 

}
