import { Injectable } from '@nestjs/common';
import { CreateCompanyDutyTypeDto } from './create-company-duty-type.dto';
import { UpdateCompanyDutyTypeDto } from './update-company-duty-type.dto';

@Injectable()
export class CompanyDutyTypeService {
  create(createCompanyDutyTypeDto: CreateCompanyDutyTypeDto) {
    return 'This action adds a new companyDutyType';
  }

  findAll() {
    return `This action returns all companyDutyType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyDutyType`;
  }

  update(id: number, updateCompanyDutyTypeDto: UpdateCompanyDutyTypeDto) {
    return `This action updates a #${id} companyDutyType`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyDutyType`;
  }
}
