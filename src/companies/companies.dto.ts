import { PagePermissionEntity } from "src/pagepermission/pagepermission.entity";
import { CompaniesEntity } from "./companies.entity";
import { CompanyDocument } from "src/company-document/company-document.entity";

export interface CompaniesDTO {
  id: number;
  companyName: string;
  companyEmail: string;
  companyContact: string;
  companyWebsite: string;
  companyLogo: string;
  companyStatus: boolean;
  createdat: Date;
  updatedat: Date;
  createdBy: number;
  parentCompanyId: number;
  file: File;
  mainCompany: CompaniesEntity;
  companyCode: string;
  documents: CompanyDocument[];
  pages: PagePermissionEntity[];
}

