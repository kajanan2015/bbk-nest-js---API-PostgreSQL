export interface CompaniesDTO {
  id: number;
  companyName: string;
  companyEmail: string;
  companyContact: string;
  companyWebsite: string;
  companyLogo: string;
  companyStatus: Boolean;
  createdat: Date;
  updatedat: Date;
  createdBy: number;
  parentCompanyId: number;
}

