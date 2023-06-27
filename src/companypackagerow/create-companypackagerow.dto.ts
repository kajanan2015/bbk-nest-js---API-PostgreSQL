import { Createmodule } from "src/createmodule/createmodule.entity";
import { Createpackage } from "src/createpackage/createpackage.entity";
import { CompaniesEntity } from "src/companies/companies.entity";
export class CreateCompanypackagerowDto {
    id: number;
    rowcount: number;
    availablerowcount: number;
    rowprice: number;
    packageprice: number;
    assigndate: Date;
    module: Createmodule;
    packages: Createpackage;
    company: CompaniesEntity;
}
