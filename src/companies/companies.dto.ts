import { PagePermissionEntity } from "src/pagepermission/pagepermission.entity";
import { CompaniesEntity } from "./companies.entity";
import { CompanyDocument } from "src/company-document/company-document.entity";
import { User } from "src/user/user.entity";
import { country } from "./country.entity";

export interface CompaniesDTO {
  
id: number;
companyType: number;
companyName: string;
companyEmail: string;
companyPhone: string;
website: string;
number: string;
street: string;
city: string;
// country: number;
postalCode: string;
vat: string;
registrationNumber: string;
regAddressNo: string;
regAddressStreet: string;
regAddressCity: string;

regAddressPostalCode: string;
status: boolean;
companyLogo: string;
companyCode: string;
createdBy: number;
createdat: Date;
updatedat: Date;
compstatus: number;
billing: string;  
parentCompanyId: number;
file: File;
mainCompany: CompaniesEntity;
documents: CompanyDocument[];
pages: PagePermissionEntity[];
users: User[];
country:country;
regAddressCountry:country,
userId:number
}
