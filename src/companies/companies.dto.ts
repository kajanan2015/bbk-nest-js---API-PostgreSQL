import { PagePermissionEntity } from "src/pagepermission/pagepermission.entity";
import { CompaniesEntity } from "./companies.entity";
import { CompanyDocument } from "src/company-document/company-document.entity";
import { User } from "src/user/user.entity";
import { country } from "./country.entity";
import { Createpackage } from "src/createpackage/createpackage.entity";
import { Createmodule } from "src/createmodule/createmodule.entity";
import { Moduledetailsofpackage } from "src/moduledetailsofpackage/moduledetailsofpackage.entity";
import { Paymenttype } from "src/createpackage/paymenttype.entity";
import { Companypackagerow } from "src/companypackagerow/companypackagerow.entity";
import { VehicleTypeEntity } from "src/vehicle-type/vehicle-type.entity";
export interface CompaniesDTO {
  
id: number;
companyType: number;
companyName: string;
companyEmail: string;
companyPhone: string;
website: string;
code: string;
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
companyLogoThumb: string;
companyCode: string;
createdBy: number;
createdat: Date;
updatedat: Date;

scheduleddeactivation: Date;
deactivationreason: string;
deactivatedtime: Date;
deactivationmethod: string;
deactivatedby: number;

compstatus: number;
billing: Paymenttype;
parentCompanyId: number;
file: File;
mainCompany: CompaniesEntity;
documents: CompanyDocument[];
pages: PagePermissionEntity[];
users: User[];
country:country;
regAddressCountry:country,
userId:number

module: Createmodule[];
package:Moduledetailsofpackage[];
contractagreement: number;
companypackagerow: Companypackagerow[];
paymentlinkotp: string;
validityperiod: Date;
vehicleentity: VehicleTypeEntity[];
}
