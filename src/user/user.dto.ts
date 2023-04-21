import { CompaniesEntity } from "src/companies/companies.entity";

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
    password:string;
    uType:string;
    status: Boolean;
    createdat:Date;
    updatedat:Date;
    companies: CompaniesEntity[];
}
