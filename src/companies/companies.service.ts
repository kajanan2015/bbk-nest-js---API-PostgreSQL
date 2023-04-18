import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CompaniesDTO } from './companies.dto';
import { CompaniesEntity } from './companies.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompaniesEntity)
    private companyRepository: Repository<CompaniesEntity>,
  ) { }

  async showAll() {
    return await this.companyRepository.find(
      {
        where: { companyStatus: 1 , mainCompany: null },
        relations: ['mainCompany']
      }
    );
  }

  async showSubAll() {
    return await this.companyRepository.find(
      {
        where: { companyStatus: 1 , mainCompany: Not(IsNull()) },
        relations: ['mainCompany']
      }
    );
  }

  async create(companyData: CompaniesEntity): Promise<CompaniesEntity> {
    const newCompany = this.companyRepository.create(companyData);
    return await this.companyRepository.save(newCompany);
  }

  async findById(id: number): Promise<CompaniesEntity> {
    return await this.companyRepository.findOne({ id });
  }

  async read(id: number): Promise<CompaniesEntity> {
    return await this.companyRepository.findOne(
      id, 
      { relations: ['mainCompany'] },
    );
  }

  async update(id: number, data: Partial<CompaniesDTO>) {
    await this.companyRepository.update({ id }, data);
    return await this.companyRepository.findOne({ id });
  }

  async destroy(id: number) {
    await this.companyRepository.delete({ id });
    return { deleted: true };
  }

}