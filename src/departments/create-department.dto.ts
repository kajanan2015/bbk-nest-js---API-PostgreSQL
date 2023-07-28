import { CompaniesEntity } from "src/companies/companies.entity";
import { User } from "src/user/user.entity";

export class CreateDepartmentDto {
    id: number;
    departmentName: string;
    status: Boolean;
    companyId: CompaniesEntity;
    createdAt: Date;
    updatedAt: Date;
    createdBy: User;
    updatedBy: User;
}