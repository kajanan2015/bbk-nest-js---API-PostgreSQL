import { Injectable } from "@nestjs/common";
import { CreateSubCompanyDto } from "./create-sub-company.dto";
import { SubCompanyEntity } from "./sub-company.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class SubCompaniesService {
  constructor(
    @InjectRepository(SubCompanyEntity)
    private subcompanyRepository: Repository<SubCompanyEntity>
  ) {}

  async create(createSubCompanyDto: CreateSubCompanyDto) {
    const subCompany = this.subcompanyRepository.create(createSubCompanyDto);
    await this.subcompanyRepository.save(createSubCompanyDto);
    return subCompany;
  }

  async findAll() {
    return await this.subcompanyRepository.find({
      where: { subcompanystatus: 1 },
    });
  }

  async findById(id: number): Promise<SubCompanyEntity> {
    return await this.subcompanyRepository.findOne({ id });
  }

  async update(id: number, data: Partial<CreateSubCompanyDto>) {
    await this.subcompanyRepository.update({ id }, data);
    return await this.subcompanyRepository.findOne({ id });
  }
}
