import { CompaniesEntity } from 'src/companies/companies.entity'

export class CreateCompanyDocumentDto {
  id: number
  documentName: string
  documentPath: string
  createdat: Date
  company: CompaniesEntity
  status: boolean
}
