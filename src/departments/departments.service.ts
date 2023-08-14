import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './create-department.dto';
import { UpdateDepartmentDto } from './update-department.dto';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>
  ) { }

  // ** Create department
  async create(createDepartmentDto: CreateDepartmentDto) {
    try {
      const customerSupportDetails = this.departmentRepository.create(createDepartmentDto);
      return await this.departmentRepository.save(customerSupportDetails);
    } catch (error) {
      return error;
    }
  }

  // ** Fetch one department
  async findOneDepartment(id: number) {
    return await this.departmentRepository.findOne({
      where: { id: id }
    })
  }

  // ** Get departments belongs to a company id
  async findDepartmentsByCompanyId(id: number) {
    return await this.departmentRepository.find({
      where: { companyId: id }
    })
  }

  // ** Update department
  async update(id: number, createDepartmentDto: CreateDepartmentDto) {
    await this.departmentRepository.update({ id }, createDepartmentDto);
    return await this.departmentRepository.findOne({ id });
  }
}
