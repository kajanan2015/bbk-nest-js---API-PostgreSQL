import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CompaniesDTO } from './companies.dto';
import { CompaniesEntity } from './companies.entity';
import { PagePermissionEntity } from 'src/pagepermission/pagepermission.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompaniesEntity)
    private companyRepository: Repository<CompaniesEntity>,
    @InjectRepository(PagePermissionEntity)
    private pagePermissionRepository: Repository<PagePermissionEntity>
  ) { }

  async showAll() {
    return await this.companyRepository.find(
      {
        where: { companyStatus: 1 , mainCompany: null },
        relations: ['mainCompany']
      }
    );
  }

  async showSubAll(mainCompanyId: number): Promise<CompaniesEntity[]> {
    return await this.companyRepository.find(
      {
        where: { companyStatus: 1 , mainCompany: {
          id: mainCompanyId
        }},
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

  async updateCompanyStatus(id: number, companyStatus: string) {
    await this.companyRepository.update({ id }, { companyStatus: () => companyStatus });
    return await this.companyRepository.findOne({ id });
  }
  
  async addPageToCompany(companyId: number, pageIds: number[]): Promise<void> {
    const company = await this.companyRepository.findOne(companyId, {
      relations: ['pages'],
    });
  
    const existingPages = company.pages.map((page) => page.id);
    const newPages = pageIds.filter((pageId) => !existingPages.includes(pageId));
  
    if (newPages.length !== pageIds.length) {
      const missingPageIds = pageIds.filter((pageId) => !newPages.includes(pageId));
      throw new NotFoundException(`Page(s) with ids ${missingPageIds.join(',')} not found`);
    }
  
    const pagesToAdd = await this.pagePermissionRepository.findByIds(newPages);
  
    company.pages.push(...pagesToAdd);
    await this.companyRepository.save(company);
  }
  
}