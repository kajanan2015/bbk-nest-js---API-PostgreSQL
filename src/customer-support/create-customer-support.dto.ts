import { CompaniesEntity } from "src/companies/companies.entity"
import { InquiryType } from "./inquiry-type/inquiry-type.entity"
import { User } from "src/user/user.entity"
import { CustomerSupport, CustomerSupportDetails } from "./customer-support.entity"

export class CreateCustomerSupportDto {
    id: number
    fullName: string
    companyName: string
    email: string
    phone: string
    inquiryType: InquiryType
    message: string
    companyId: CompaniesEntity
    createdAt: Date
    createdBy: User
    customerSupportId: CustomerSupport[]

    customerSupportDetailsId: CustomerSupportDetails
    status: Boolean
    resolvedAt: Date
    assignDate: Date;
    assignedBy: User;
}
