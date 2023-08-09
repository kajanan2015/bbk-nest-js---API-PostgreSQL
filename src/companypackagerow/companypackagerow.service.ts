import { Injectable } from '@nestjs/common';
import { CreateCompanypackagerowDto } from './create-companypackagerow.dto';
import { UpdateCompanypackagerowDto } from './update-companypackagerow.dto';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Companypackagerow } from './companypackagerow.entity';
import { AssignPackageStatus } from './companypackagerow.entity';
@Injectable()
export class CompanypackagerowService {
  constructor(@InjectRepository(Companypackagerow)
  private companyPaymentRepository: Repository<Companypackagerow>) { }

  async create(createCompanypackagerowDto) {
    const response = await this.companyPaymentRepository.create(createCompanypackagerowDto);
    await this.companyPaymentRepository.save(response);
  }

  findAll() {
    return `This action returns all companypackagerow`;
  }

  async findOne(id: number,date) {
    const response = await this.companyPaymentRepository.find({
      where: {
        company: { id }, // Assuming 'id' is the ID of the company you want to filter by
        enddate: MoreThanOrEqual(date),
        status: AssignPackageStatus.PENDING
      },
      relations: ["module", "packages", "moduledetails"]
    });
    return response;
  }

  async findOneActive(id: number,date) {
    const response = await this.companyPaymentRepository.find({
      where: {
        company: { id }, // Assuming 'id' is the ID of the company you want to filter by
        enddate: MoreThanOrEqual(date),
        status: AssignPackageStatus.ACTIVE
      },
      relations: ["module", "packages", "moduledetails"]
    });
    return response;
  }

  update(id: number, updateCompanypackagerowDto: UpdateCompanypackagerowDto) {
    return `This action updates a #${id} companypackagerow`;
  }

  remove(id: number) {
    return `This action removes a #${id} companypackagerow`;
  }
}
