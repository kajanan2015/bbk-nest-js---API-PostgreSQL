import { EmpDesignation } from "./designation/employee-designation.entity";
import { EmployeeType } from "./employee_type/employee-type.entity";
import { CompaniesEntity } from "src/companies/companies.entity";
import { Gender } from "./gender/gender.entity";
import { MaritalStatus } from "./marital_status/maritalStatus.entity";

export class CreateEmployeeModuleDto {
    id: number;
    employeeId: string;
    employeeType: EmployeeType[];
    designation: EmpDesignation[];
    company:CompaniesEntity[];
    firstName: string;
    lastName: string;
    dob: Date;
    gender: Gender[];
    maritalStatus: MaritalStatus[];
    profilePic: string;
    profilePicThumb: string;
    mobilePhone: string;
    homePhone: string;
    email: string;
    emergContactName: string;
    emergeContactNo: string;
    addressName: string;
    addressStreet: string;
    addressCity: string;
    addressState: string;
    addressPostal: string;
    addressCountry: string;
}
