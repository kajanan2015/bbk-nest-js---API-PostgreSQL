import { Injectable } from "@nestjs/common";
import { CreateCompanyUserRoleDto } from "./create-company-user-role.dto";
import { UpdateCompanyUserRoleDto } from "./update-company-user-role.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyUserRole } from "./company-user-role.entity";
import { FindOneOptions, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
@Injectable()
export class CompanyUserRoleService {
  constructor(
    @InjectRepository(CompanyUserRole)
    private CompanyUserRepository: Repository<CompanyUserRole>
  ) {}

  async create(data) {
    console.log(data, 5555);
    const newhashpassword = await this.hashPassword(data.password);
    console.log(newhashpassword , 666666)
    const user = {
      ...data,
      password: newhashpassword,
     
    };
    const companyuser = this.CompanyUserRepository.create(user);
    await this.CompanyUserRepository.save(companyuser);
    return companyuser;
  }

  async hashPassword(plain: string): Promise<string> {
    const saltRounds = 10;
    const hashed: string = await bcrypt.hash(plain, saltRounds);
    return hashed;
  }

  async findAll(): Promise<CompanyUserRole[]> {
    return this.CompanyUserRepository.find();
  }

  async findOne(id): Promise<CompanyUserRole> {
    return this.CompanyUserRepository.findOne(id);
  }

  async update(id: number, data, updatecompanyuserroleDto) {
    const updatecompanyuser = await this.CompanyUserRepository.update({ id }, data);
    const options: FindOneOptions = { where: { id } };
    return await this.CompanyUserRepository.findOne(options);
  }

  async remove(id: number): Promise<void> {
    await this.CompanyUserRepository.delete(id);
  }
}
