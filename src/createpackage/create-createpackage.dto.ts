import { Moduledetailsofpackage } from "src/moduledetailsofpackage/moduledetailsofpackage.entity";
import { CompaniesEntity } from "src/companies/companies.entity";
export class CreateCreatepackageDto {   
    id:number;
    packagename:string;
    packagelogo: string;
    status: number;
    packagedetails:Moduledetailsofpackage[];
    company:CompaniesEntity[];
    paymentType: CompaniesEntity[];
    starteddate: Date;
    enddate: Date;
    validity:boolean
    
}
