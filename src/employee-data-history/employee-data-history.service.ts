import { Injectable } from '@nestjs/common';
import { UpdateEmployeeDataHistoryDto } from './update-employee-data-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeDataHistory } from './employee-data-history.entity';

@Injectable()
export class EmployeeDataHistoryService {

  constructor(
    @InjectRepository(EmployeeDataHistory)
    private empDataHistoryRepository: Repository<EmployeeDataHistory>,
  ) { }

  async create(createEmployeeDataHistoryDto) {
    const response = this.empDataHistoryRepository.create(createEmployeeDataHistoryDto);
    return await this.empDataHistoryRepository.save(response);
  }

  async findEmpDataHistory(createEmployeeDataHistoryDto) {
    return await this.empDataHistoryRepository.find({
        where:{
          employee:createEmployeeDataHistoryDto.employee, 
          type:createEmployeeDataHistoryDto.type,
        },
        relations: ['editedBy']
        });
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeDataHistory`;
  }

  update(id: number, updateEmployeeDataHistoryDto: UpdateEmployeeDataHistoryDto) {
    return `This action updates a #${id} employeeDataHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeDataHistory`;
  }
}
