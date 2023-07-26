import { CompaniesEntity } from "src/companies/companies.entity"
import { InquiryType } from "./inquiry-type/inquiry-type.entity"
import { User } from "src/user/user.entity"

export class CreateCustomerSupportDto {
    id: number
    inquiryType: InquiryType
    message: string
    companyId: CompaniesEntity
    status: Boolean
    createdAt: Date
    resolvedAt: Date
    createdBy: User
}
