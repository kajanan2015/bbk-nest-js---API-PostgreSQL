import { Injectable } from '@nestjs/common';
import { UpdateEmployeeDataHistoryDto } from './update-employee-data-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeDataHistory } from './employee-data-history.entity';
import { EmployeeInfo } from 'src/employee-module/employee-module.entity';

@Injectable()
export class EmployeeDataHistoryService {

  constructor(
    @InjectRepository(EmployeeDataHistory)
    private empDataHistoryRepository: Repository<EmployeeDataHistory>,
    @InjectRepository(EmployeeInfo)
    private employeeModuleRepository: Repository<EmployeeInfo>,
  ) { }

  async create(createEmployeeDataHistoryDto) {

    const response = this.empDataHistoryRepository.create(createEmployeeDataHistoryDto);

    // Find the previous record of the employee
    const previousRecord = await this.empDataHistoryRepository.findOne({
      where: {
        employee: +createEmployeeDataHistoryDto.employee,
        type: createEmployeeDataHistoryDto.type
      },
      order: { created_at: 'DESC' },
    });

    // If a previous record exists, update its endDate
    if (previousRecord) {
      previousRecord.updated_at = createEmployeeDataHistoryDto.created_at;
      previousRecord.updated_by = createEmployeeDataHistoryDto.created_by;
      await this.empDataHistoryRepository.save(previousRecord);
    }

    return await this.empDataHistoryRepository.save(response);

  }

  async findEmpDataHistory(createEmployeeDataHistoryDto) {
    const [results, totalCount] = await this.empDataHistoryRepository.findAndCount({
      where: {
        employee: createEmployeeDataHistoryDto.employee,
        type: createEmployeeDataHistoryDto.type,
      },
      relations: ['updated_by', 'created_by'],
      order: {
        start_date: 'DESC',
      },
      skip: createEmployeeDataHistoryDto.page * createEmployeeDataHistoryDto.pageSize,
      take: createEmployeeDataHistoryDto.pageSize, 
    });

  return {
    historyList : results,
    totalCount,
    totalPages: Math.ceil(totalCount / createEmployeeDataHistoryDto.pageSize),  // Calculate the total number of pages
  };
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
