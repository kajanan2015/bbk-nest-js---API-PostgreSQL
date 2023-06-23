import { PartialType } from "@nestjs/mapped-types";
import { CreateCompanyUserRoleDto } from "./create-company-user-role.dto";

export class UpdateCompanyUserRoleDto extends PartialType(
  CreateCompanyUserRoleDto
) {
  updatedValues: any;
}
