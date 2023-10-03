import { CompaniesEntity } from "src/companies/companies.entity";
import { User } from "src/user/user.entity";
import { EmployeeDataHistory } from "src/employee-data-history/employee-data-history.entity";
export class CreateCompanyWorkPatternDto {

    id: number;
    workPatternName: string;
    workType: number; patternType: number;
    noOfDays: number;
    noOfWeeks: number;
    noOfWorkDays: number;
    noOfOffDays: number;
    company: CompaniesEntity;
    workPatternCode: string;
    createdat: Date;
    patterncreate: User;
    editHistory: EmployeeDataHistory[];
    patternupdate: User;
}
