import { Injectable } from '@nestjs/common';
import { CreateEmployeeModuleDto } from './create-employee-module.dto';
import { UpdateEmployeeModuleDto } from './update-employee-module.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeModule } from './employee-module.entity';

@Injectable()
export class EmployeeModuleService {
  constructor(
    @InjectRepository(EmployeeModule)
    private employeeModuleRepository: Repository<EmployeeModule>
  ) {}
  async create(createEmployeeModuleDto) {
    const response=this.employeeModuleRepository.create(createEmployeeModuleDto);
    return await this.employeeModuleRepository.save(response);
  }

 async findAll() {
    return await this.employeeModuleRepository.find();
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
}
