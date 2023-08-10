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
  private companypackagerowrepo: Repository<Companypackagerow>) { }

  async create(createCompanypackagerowDto) {
    const response = await this.companypackagerowrepo.create(createCompanypackagerowDto);
    await this.companypackagerowrepo.save(response);
  }

  findAll() {
    return `This action returns all companypackagerow`;
  }

  async findOne(id: number,date) {
    const response = await this.companypackagerowrepo.find({
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
    const response = await this.companypackagerowrepo.find({
      where: {
        company: { id }, // Assuming 'id' is the ID of the company you want to filter by
        enddate: MoreThanOrEqual(date),
        status: AssignPackageStatus.ACTIVE
      },
      relations: ["module", "packages", "moduledetails"]
    });
    return response;
  }

async findvaliditypackage(id,date){
  const response = await this.companypackagerowrepo.find({
    where: {
      company: { id }, // Assuming 'id' is the ID of the company you want to filter by
      enddate: MoreThanOrEqual(date),
      status: AssignPackageStatus.ACTIVE
    },
    relations: ["module", "packages", "moduledetails"],
    order: {
      enddate: 'ASC', // Order by enddate in ascending order
    },
  });
  const data={
    enddate:response[0].enddate,
    trialpackageidentifier:response[0].trialpackageidentifier
  }
  return {data,response};
}


  update(id: number, updateCompanypackagerowDto: UpdateCompanypackagerowDto) {
    return `This action updates a #${id} companypackagerow`;
  }

  remove(id: number) {
    return `This action removes a #${id} companypackagerow`;
  }
}
