import { CompaniesEntity } from "src/companies/entity/companies.entity";

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
    companies: CompaniesEntity[];
}
