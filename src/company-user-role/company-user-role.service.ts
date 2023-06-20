import { Injectable } from "@nestjs/common";
import { CreateCompanyUserRoleDto } from "./create-company-user-role.dto";
import { UpdateCompanyUserRoleDto } from "./update-company-user-role.dto";

@Injectable()
export class CompanyUserRoleService {
  create(createCompanyUserRoleDto: CreateCompanyUserRoleDto) {
    return "This action adds a new companyUserRole";
  }

  findAll() {
    return `This action returns all companyUserRole`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyUserRole`;
  }

  update(id: number, updateCompanyUserRoleDto: UpdateCompanyUserRoleDto) {
    return `This action updates a #${id} companyUserRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyUserRole`;
  }
}
