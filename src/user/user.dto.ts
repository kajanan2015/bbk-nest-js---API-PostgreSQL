import { CompaniesEntity } from "src/companies/companies.entity";
import { PermissionRoleEntity } from "src/permission-role/permission-role.entity";

export class CreateUserDto {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    employeeNumber: string;
    dob: Date;
    address: string;
    email: string;
    phone: string;
    nationality: string;
    country: string;
    profilePic: string;
    password:string;
    uType:string;
    status: Boolean;
    createdat:Date;
    updatedat:Date;
    companies: CompaniesEntity[];
    roles: PermissionRoleEntity[];
}
