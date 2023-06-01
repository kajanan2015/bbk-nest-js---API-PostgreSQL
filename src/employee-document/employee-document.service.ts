import { Injectable } from '@nestjs/common';
import { CreateEmployeeDocumentDto } from './create-employee-document.dto';
import { UpdateEmployeeDocumentDto } from './update-employee-document.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeDocument } from './employee-document.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeDocumentService {
  constructor(
    @InjectRepository(EmployeeDocument)
    private employeeDocumentRepository: Repository<EmployeeDocument>
  ) {}
  async create(createEmployeeDocumentDto) {
    const response = this.employeeDocumentRepository.create(createEmployeeDocumentDto);
    return await this.employeeDocumentRepository.save(response);
  }

  async findAll() {
    return await this.employeeDocumentRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeDocument`;
  }

  async update(id: number, updateEmployeeDocumentDto) {
    await this.employeeDocumentRepository.update({ id }, updateEmployeeDocumentDto);
    return await this.employeeDocumentRepository.findOne({ id })
  }

  remove(id: number) {
    return `This action removes a #${id} employeeDocument`;
  }
}
