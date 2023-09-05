import { Injectable } from '@nestjs/common';
import { CreateCompanyWiseThemeCustomizeDto } from './create-company-wise-theme-customize.dto';
import { UpdateCompanyWiseThemeCustomizeDto } from './update-company-wise-theme-customize.dto';
import { CompanyWiseThemeCustomize } from './company-wise-theme-customize.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class CompanyWiseThemeCustomizeService {
  constructor(
    @InjectRepository(CompanyWiseThemeCustomize)
    private readonly themerepository: Repository<CompanyWiseThemeCustomize>,) {
  }
  async create(company_id, data) {

    const checkexist = await this.themerepository.findOne({ where: { company: company_id } })

    let response;
    if (checkexist) {
      delete data.createdat;
      delete data.created_by;
      response = await this.themerepository.update(checkexist.data_id, data)
    } else {
      delete data.updatedat;
      delete data.updated_by;
      data.company = company_id;
      response = await this.themerepository.create(data)
      await this.themerepository.save(response)
    }
    if (response) {
      return 200
    } else {
      return 500
    }
  }

  findAll() {
    return `This action returns all companyWiseThemeCustomize`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyWiseThemeCustomize`;
  }

  update(id: number, updateCompanyWiseThemeCustomizeDto: UpdateCompanyWiseThemeCustomizeDto) {
    return `This action updates a #${id} companyWiseThemeCustomize`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyWiseThemeCustomize`;
  }
}
