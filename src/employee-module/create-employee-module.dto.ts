import { EmpDesignation } from "./designation/employee-designation.entity";
import { EmployeeType } from "./employee_type/employee-type.entity";
import { CompaniesEntity } from "src/companies/companies.entity";
import { Gender } from "./gender/gender.entity";
import { MaritalStatus } from "./marital_status/maritalStatus.entity";
import { EmployeeDocument } from "src/employee-document/employee-document.entity";
import { DrivingLicenceType } from "./driving_licence_type/driving_licence_type.entity";
import { PaymentFrequency } from "./payment_frequency/payment_frequency.entity";
import { Bank } from "./bank/bank.entity";
export class CreateEmployeeModuleDto {
    id: number;
    employeeId: string;
    employeeType: EmployeeType[];
    designation: EmpDesignation[];
    company:CompaniesEntity[];
    firstName: string;
    lastName: string;
    dob: Date;
    gender: Gender[];
    maritalStatus: MaritalStatus[];
    profilePic: string;
    profilePicThumb: string;
    mobilePhone: string;
    homePhone: string;
    email: string;
    emergContactName: string;
    emergeContactNo: string;
    addressName: string;
    addressStreet: string;
    addressCity: string;
    addressState: string;
    addressPostal: string;
    addressCountry: string;
    empProvidedForm: string;
    dateofJoined: Date;
    niNo: string;
    totalHolidays: string;
    isNonNative: boolean;
    documents: EmployeeDocument[];
    officialDocType: string;
    officialDocNo: string;
    officialDocIssueDate: Date;
    officialDocExpireDate: Date;
    visaType: string;
    visaNo: string;
    visaIssueDate: Date;
    visaExpireDate: Date;
    contract: boolean;
    offerLetter: boolean;
    referenceCheck: boolean;
    refName: string;
    refCompanyName: string;
    refContact: string;
    refEmail: string;
    refGivenDate: Date;
    refCompAddressName: string;
    refCompAddressStreet: string;
    refCompAddressCity: string;
    refCompAddressState: string;
    refCompAddressPostal: string;
    refCompAddressCountry: string;
    drivingLicence: string;
    drivingLicenceNo: string;
    drivingLicenceCategory: string;
    drivingLicenceIssue: Date;
    drivingLicenceExpire: Date;
    drivingLicenceCatDIssue: Date;
    drivingLicenceCatDExpire: Date;
    tachoCard: boolean;
    tachoNo: string;
    tachoIssueDate: Date;
    tachoExpireDate: Date;
    cpcCard: boolean;
    cpcCardNo: string;
    cpcCardIssueDate: Date;
    cpcCardExpireDate: Date;
    crbCheckCard: boolean;
    crbCardNo: string;
    crbCardIssueDate: Date;
    crbCardExpireDate: Date;
    additionalDocs: boolean;
    drivingLicenceType: DrivingLicenceType[];
    paymentFrequency: PaymentFrequency[];
    bank: Bank[];
}
