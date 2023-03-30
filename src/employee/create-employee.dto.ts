import { CompaniesEntity } from "src/companies/companies.entity";

export class CreateEmployeeDto {
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
    employeeStatus: Boolean;
    createdat:Date;
    updatedat:Date;
    password: string;
    companies: CompaniesEntity[];
}
