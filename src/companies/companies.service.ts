import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CompaniesDTO } from './companies.dto';
import { CompaniesEntity } from './companies.entity';
import { PagePermissionEntity } from 'src/pagepermission/pagepermission.entity';
import { SystemCodeService } from 'src/system-code/system-code.service';
@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompaniesEntity)
    private companyRepository: Repository<CompaniesEntity>,
    @InjectRepository(PagePermissionEntity)
    private pagePermissionRepository: Repository<PagePermissionEntity>,
    private readonly systemcodeService:SystemCodeService
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

  async create(companyData) {
   console.log(companyData.filename,7777);
   console.log(companyData.filename[1].profilepic[0],3323232)
    const response=await this.systemcodeService.findOne('company')
    const companyCode=response.code+''+response.startValue   
    const newstartvalue={
      startValue:response.startValue+1
    }
    const newcompanyData={
      ...companyData,
      companyCode:companyCode,
      companyLogo:companyData.filename[0].companylogo[0]
    }
    const profileData={
     firstname: companyData.firstname,
     lastname: companyData.lastname,
     email:companyData.email,
     password: companyData.password,
     profilePic: companyData.filename[1].profilepic[0]
    }
    
    await this.systemcodeService.update(response.id,newstartvalue)
    const newCompany = this.companyRepository.create(newcompanyData);
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
    const pagesToRemove = existingPages.filter((pageId) => !pageIds.includes(pageId));
    const pagesToAdd = pageIds.filter((pageId) => !existingPages.includes(pageId));
  
    if (pagesToRemove.length) {
      company.pages = company.pages.filter((page) => !pagesToRemove.includes(page.id));
      await this.companyRepository.save(company);
    }    
  
    if (pagesToAdd.length) {
      const pagesToAddEntities = await this.pagePermissionRepository.findByIds(
        pagesToAdd
      );
      company.pages.push(...pagesToAddEntities);
    }
  
    await this.companyRepository.save(company);
  }
  
}