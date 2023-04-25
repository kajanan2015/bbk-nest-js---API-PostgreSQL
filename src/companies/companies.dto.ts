import { CompaniesEntity } from "./companies.entity";

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
}

