import { EmpDesignation } from "./employee-designation.entity";
import { EmployeeType } from "./employee-type.entity";
import { CompaniesEntity } from "src/companies/companies.entity";
import { Gender } from "./gender/gender.entity";

export class CreateEmployeeModuleDto {
    id: number;
    employeeId: string;
    employeeType: EmployeeType[];
    designation: EmpDesignation[];
    company:CompaniesEntity[];
    firstName: string;
    lastName: string;
    gender: Gender[]
}
