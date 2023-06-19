import { CompaniesEntity } from 'src/companies/companies.entity';


export class CreateCompanyDocumentDto {
  id: number;
  documentPath: string;
  createdat: Date;
  company:CompaniesEntity
}
