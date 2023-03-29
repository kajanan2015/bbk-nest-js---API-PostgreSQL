//by Abi - 28/03/2023
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniesService } from 'src/companies/companies.service';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './create-employee.dto';
import { Employee } from './employee.entity';
import { UpdateEmployeeDto } from './update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private readonly companiesService: CompaniesService,
  ) {}

  //create employee
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = Object.assign(new Employee(), createEmployeeDto);

    const companies = [];
    for (const companyName of createEmployeeDto.companies) {
      // const company = await this.companiesService.findById(companyName.id);
      // if (!company) {
      //   throw new NotFoundException(`Company with name '${companyName}' not found`);
      // }
      companies.push(companyName.id);
    }
    employee.companies = companies;
  
    return this.employeeRepository.save(employee);
  }
  
  //edit employee
  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.findOne(id);
    
    if (!employee) {
      throw new NotFoundException(`Employee with ID '${id}' not found`);
    }
  
    Object.assign(employee, updateEmployeeDto);
  
    const companies = [];
    for (const companyName of updateEmployeeDto.companies) {
      // const company = await this.companiesService.findById(companyName.id);
      // if (!company) {
      //   throw new NotFoundException(`Company with name '${companyName}' not found`);
      // }
      companies.push(companyName.id);
    }
    employee.companies = companies;
  
    return this.employeeRepository.save(employee);
  }

  //get all employee
  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
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
