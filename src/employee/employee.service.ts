//by Abi - 28/03/2023
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UpdateEmployeeDto } from './update-employee.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly userService:UserService
  ) {}

  //create employee
  async create(createEmployeeDto: CreateUserDto) {
    const employee = Object.assign(createEmployeeDto);

   
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
   
    // employee.companies = companies;
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
  // async findAllsubadmin(comid: number): Promise<Employee[]> {
  //   return this.employeeRepository.find({ 
  //     relations: ['companies'],
  //     where: { employeeStatus: 1,parentCompanyid:comid }, 
  //   });
  // }

  //get employee by id


}
