import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CompanyUserRoleService } from "./company-user-role.service";
import { CreateCompanyUserRoleDto } from "./create-company-user-role.dto";
import { UpdateCompanyUserRoleDto } from "./update-company-user-role.dto";

@Controller("company-user-role")
export class CompanyUserRoleController {
  constructor(
    private readonly companyUserRoleService: CompanyUserRoleService
  ) {}

  @Post()
  create(@Body() createCompanyUserRoleDto: CreateCompanyUserRoleDto) {
    return this.companyUserRoleService.create(createCompanyUserRoleDto);
  }

  @Get()
  findAll() {
    return this.companyUserRoleService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.companyUserRoleService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCompanyUserRoleDto: UpdateCompanyUserRoleDto
  ) {
    return this.companyUserRoleService.update(+id, updateCompanyUserRoleDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.companyUserRoleService.remove(+id);
  }
}
