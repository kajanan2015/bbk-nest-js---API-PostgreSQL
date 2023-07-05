import { CompaniesEntity } from "src/companies/companies.entity";
import { User } from "src/user/user.entity";
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
}
