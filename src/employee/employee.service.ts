import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniesService } from 'src/companies/companies.service';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private readonly companiesService: CompaniesService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = new Employee();
    employee.firstName = createEmployeeDto.firstName;
    employee.middleName = createEmployeeDto.middleName;
    employee.lastName = createEmployeeDto.lastName;
    employee.employeeNumber = createEmployeeDto.employeeNumber;
    employee.dob = createEmployeeDto.dob;
    employee.address = createEmployeeDto.address;
    employee.email = createEmployeeDto.email;
    employee.phone = createEmployeeDto.phone;
    employee.nationality = createEmployeeDto.nationality;
    employee.country = createEmployeeDto.country;
    
    const companies = [];
    for (const companyName of createEmployeeDto.companies) {
      const company = await this.companiesService.findByName(companyName.name);
      if (!company) {
        throw new NotFoundException(`Company with name '${companyName}' not found`);
      }
      companies.push(company);
    }
    employee.companies = companies;
  
    return this.employeeRepository.save(employee);
  }
  
  findAll() {
    return `This action returns all employee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
