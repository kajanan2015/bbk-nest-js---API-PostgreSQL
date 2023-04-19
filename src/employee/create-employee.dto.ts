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
    employeeStatus: boolean;
    createdat:Date;
    updatedat:Date;
    password: string;
    typeEmployee:string;
    companies: CompaniesEntity[];
}
