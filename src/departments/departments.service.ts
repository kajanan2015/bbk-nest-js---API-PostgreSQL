import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './create-department.dto';
import { UpdateDepartmentDto } from './update-department.dto';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemCodeService } from 'src/system-code/system-code.service';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    private readonly systemcodeService: SystemCodeService,
  ) { }

  // ** Create department
  async create(createDepartmentDto: CreateDepartmentDto) {
    try {
      const responseSystemCode = await this.systemcodeService.findOne("department");
      const systemcode = responseSystemCode.code + "" + responseSystemCode.startValue;
      const newstartvalue = {
        startValue: responseSystemCode.startValue + 1,
      };
      createDepartmentDto.departmentId = systemcode;
      const customerSupportDetails = this.departmentRepository.create(createDepartmentDto);
      await this.systemcodeService.update(responseSystemCode.id, newstartvalue);
      return await this.departmentRepository.save(customerSupportDetails);
    } catch (error) {
      return error;
    }
  }

  // ** Find all department
  async findAll() {
    return await this.departmentRepository.find(
      {
        relations: ['createdBy', 'updatedBy']
      }
    );
  }

  // ** Fetch one department
  async findOneDepartment(id: number) {
    return await this.departmentRepository.findOne({
      where: { id: id }
    })
  }

  // ** Get departments belongs to a company id
  async findDepartmentsByCompanyId(id: number) {
    const result = await this.departmentRepository.query('CALL  GetDepartmentBycompany (?,?)', [id,1]);
    return result;
    // return await this.departmentRepository.find({
    //   where: { companyId: id }
    // })
  }

  // ** Update department
  async update(id: number, createDepartmentDto: CreateDepartmentDto) {
    await this.departmentRepository.update({ id }, createDepartmentDto);
    return await this.departmentRepository.findOne({ id });
  }
}
