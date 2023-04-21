export interface CompaniesDTO {
  id: number;
  companyName: string;
  companyEmail: string;
  companyContact: string;
  companyStatus: Boolean;
  createdBy: number;
  createdat: Date;
  updatedat: Date;
  parentCompanyId: number;
}