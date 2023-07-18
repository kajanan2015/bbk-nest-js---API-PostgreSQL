import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, JoinColumn, ManyToOne } from 'typeorm';
import { EmployeeType } from './employee_type/employee-type.entity';
import { EmpDesignation } from './designation/employee-designation.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { Gender } from './gender/gender.entity';
import { MaritalStatus } from './marital_status/maritalStatus.entity';
import { EmployeeDocument } from 'src/employee-document/employee-document.entity';
import { DrivingLicenceType } from './driving_licence_type/driving_licence_type.entity';
import { PaymentFrequency } from './payment_frequency/payment_frequency.entity';
import { Bank } from './bank/bank.entity';
import { User } from 'src/user/user.entity';
import { country } from 'src/companies/country/country.entity';
import { EmployeeDataHistory } from 'src/employee-data-history/employee-data-history.entity';
import { DrivingLicenceCategory } from './driving_licence_category/driving_licence_category.entity';

enum employeeStatus {
    active = 'active',
    inactive = 'inactive',
}

enum salaryType {
    hourlyRate = 'hourlyRate',
    dayRate = 'dayRate',
    salary = 'salary'
}

enum salaryOtType {
    hour = 'hour',
    day = 'day',
}

enum salarySickType {
    ssp = 'ssp',
    csp = 'csp',
}

enum empProvidedForm {
    p45 = 'p45',
    p46 = 'p46'
}

enum officialDoc {
    passport = 'passport',
    birthCertificate = 'birthCertificate'
}

@Entity('employee')
export class Employee {
    @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
    id: number;

    @Column("varchar", { name: 'employee_code', nullable: true, default: () => null })
    employeeCode: string;

    @ManyToOne(() => CompaniesEntity, company => company.employedetails)
    @JoinColumn({ name: 'company_id' })
    company: CompaniesEntity;

    @Column("timestamp", { name:'created_at', default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @ManyToOne(() => User, user => user.empCreatedUser)
    @JoinColumn({ name: 'created_by' })
    created_by: User;

    @Column("timestamp", { name:'updated_at', default: () => null })
    updated_at: Date;    

    @ManyToOne(() => User, user => user.empUpdatedUser)
    @JoinColumn({ name: 'updated_by' })
    updated_by: User;

    @OneToMany(() => EmployeeInfo, employee => employee.employee, ({ cascade: true }))
    linkedEmployee: EmployeeInfo[];

    @OneToMany(() => EmployeePayrollInfo, employee => employee.employee, ({ cascade: true }))
    linkedEmployeePayroll: EmployeePayrollInfo[];

    @OneToMany(() => EmployeeDocument, empDocuments => empDocuments.empid, { cascade: true })
    documents: EmployeeDocument[];
}

@Entity('employee-info')
export class EmployeeInfo {
    @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
    id: number;

    @ManyToOne(() => EmployeeType, employeetype => employeetype.employeType)
    @JoinColumn({ name: 'employee_type' })
    employeeType: EmployeeType;

    @ManyToOne(() => EmpDesignation, designation => designation.designation)
    @JoinColumn({ name: 'employee_designation' })
    designation: EmpDesignation;    

    @Column("varchar", { name: 'first_name', nullable: true, default: () => null })
    firstName: string | null;

    @Column("varchar", { name: 'last_name', nullable: true, default: () => null })
    lastName: string | null;

    @Column({ name: 'dob', nullable: true, default: () => null })
    dob: Date | null;

    @ManyToOne(() => Gender, gender => gender.employee)
    @JoinColumn({ name: 'gender' })
    gender: Gender;

    @ManyToOne(() => MaritalStatus, maritalStatus => maritalStatus.employee)
    @JoinColumn({ name: 'marital_status' })
    maritalStatus: MaritalStatus;

    @Column("varchar", { name: 'profile_picture', nullable: true, length: 500, default: () => null })
    profilePic: string | null;

    @Column("varchar", { name: 'profile_picture_thumb', nullable: true, length: 500, default: () => null })
    profilePicThumb: string | null;

    @Column("varchar", { name: 'mobile_phone', nullable: true, length: 250, default: () => null })
    mobilePhone: string | null;

    @Column("varchar", { name: 'home_phone', nullable: true, length: 250, default: () => null })
    homePhone: string | null;

    @Column("varchar", { name: 'email', nullable: true, length: 250, default: () => null })
    email: string | null;

    @Column("varchar", { name: 'emergency_contact_name', nullable: true, length: 250, default: () => null })
    emergContactName: string | null;

    @Column("varchar", { name: 'emergency_contact_no', nullable: true, length: 250, default: () => null })
    emergeContactNo: string | null;

    @Column("varchar", { name: 'employee_address_name', nullable: true, length: 250, default: () => null })
    addressName: string | null;

    @Column("varchar", { name: 'employee_address_street', nullable: true, length: 250, default: () => null })
    addressStreet: string | null;

    @Column("varchar", { name: 'employee_address_city', nullable: true, length: 250, default: () => null })
    addressCity: string | null;

    @Column("varchar", { name: 'employee_address_state', nullable: true, length: 250, default: () => null })
    addressState: string | null;

    @Column("varchar", { name: 'employee_address_postal', nullable: true, length: 250, default: () => null })
    addressPostal: string | null;

    @ManyToOne(() => country, country => country.employeeCountry)
    @JoinColumn({ name: 'employee_address_country' })
    addressCountry: country;

    @Column({
        type: 'enum',
        enum: empProvidedForm,
        default: null,
        name: 'employee_provided_form',
        nullable: true,
    })
    empProvidedForm: empProvidedForm | null;

    @Column({ name: 'date_of_joined', nullable: true, default: () => null })
    dateofJoined: Date | null;

    @Column("varchar", { name: 'ni_no', nullable: true, length: 250, default: () => null })
    niNo: string | null;

    @Column("varchar", { name: 'total_holidays', nullable: true, length: 250, default: () => null })
    totalHolidays: string | null;

    @Column({ name: 'non_native', type: 'boolean', default: null })
    isNonNative: boolean;

    @Column({
        type: 'enum',
        enum: officialDoc,
        default: null,
        name: 'official_doc_type',
        nullable: true,
    })
    officialDocType: officialDoc | null;

    @Column("varchar", { name: 'official_doc_no', nullable: true, length: 250, default: () => null })
    officialDocNo: string | null;

    @Column({ name: 'official_doc_issue_date', nullable: true, default: () => null })
    officialDocIssueDate: Date | null;

    @Column({ name: 'official_doc_expire_date', nullable: true, default: () => null })
    officialDocExpireDate: Date | null;

    @Column("varchar", { name: 'visa_type', nullable: true, length: 250, default: () => null })
    visaType: string | null;

    @Column("varchar", { name: 'visa_no', nullable: true, length: 250, default: () => null })
    visaNo: string | null;

    @Column({ name: 'visa_issue_date', nullable: true, default: () => null })
    visaIssueDate: Date | null;

    @Column({ name: 'visa_expire_date', nullable: true, default: () => null })
    visaExpireDate: Date | null;

    // @Column({ name: 'contract_submit', type: 'boolean', default: null })
    // contract: boolean;

    // @Column({ name: 'offer_letter_submit', type: 'boolean', default: null })
    // offerLetter: boolean;

    // @Column({ name: 'reference_check_submit', type: 'boolean', default: null })
    // referenceCheck: boolean;

    @Column("varchar", { name: 'reference_name', nullable: true, length: 250, default: () => null })
    refName: string | null;

    @Column("varchar", { name: 'reference_company_name', nullable: true, length: 250, default: () => null })
    refCompanyName: string | null;

    @Column("varchar", { name: 'reference_contact', nullable: true, length: 250, default: () => null })
    refContact: string | null;

    @Column("varchar", { name: 'reference_email', nullable: true, length: 250, default: () => null })
    refEmail: string | null;

    @Column({ nullable: true, name: 'reference_given_date', default: () => null })
    refGivenDate: Date | null;

    @Column("varchar", { name: 'reference_company_address_name', nullable: true, length: 250, default: () => null })
    refCompAddressName: string | null;

    @Column("varchar", { name: 'reference_company_address_street', nullable: true, length: 250, default: () => null })
    refCompAddressStreet: string | null;

    @Column("varchar", { name: 'reference_company_address_city', nullable: true, length: 250, default: () => null })
    refCompAddressCity: string | null;

    @Column("varchar", { name: 'reference_company_address_state', nullable: true, length: 250, default: () => null })
    refCompAddressState: string | null;

    @Column("varchar", { name: 'reference_company_address_postal', nullable: true, length: 250, default: () => null })
    refCompAddressPostal: string | null;

    // @Column("varchar", { nullable: true, length: 250, default: () => null })
    // refCompAddressCountry: string | null;

    @ManyToOne(() => country, refCompAddressCountry => refCompAddressCountry.refCompAddressCountry)
    @JoinColumn({ name: 'reference_company_address_country' })
    refCompAddressCountry: country;

    // @Column({ name: 'driving_licence_submit', type: 'boolean', default: null })
    // drivingLicence: boolean;

    // @Column("varchar", { nullable: true, length: 250, default: () => null })
    // drivingLicenceType: string | null;

    @Column("varchar", { name: 'driving_licence_no', nullable: true, length: 250, default: () => null })
    drivingLicenceNo: string | null;

    // @Column("varchar", { nullable: true, length: 250, default: () => null })
    // drivingLicenceCategory: string | null;

    @ManyToOne(() => DrivingLicenceType, drivingLicenceType => drivingLicenceType.employee)
    @JoinColumn({ name: 'driving_licence_type' })
    drivingLicenceType: DrivingLicenceType;

    @Column({ name: 'driving_licence_issue_date', nullable: true, default: () => null })
    drivingLicenceIssue: Date | null;

    @Column({ name: 'driving_licence_expire_date', nullable: true, default: () => null })
    drivingLicenceExpire: Date | null;

    @Column({ name: 'driving_licence_catd_issue_date', nullable: true, default: () => null })
    drivingLicenceCatDIssue: Date | null;

    @Column({ name: 'driving_licence_catd_expire_date', nullable: true, default: () => null })
    drivingLicenceCatDExpire: Date | null;

    // @Column({ name: 'tacho_card_submit', type: 'boolean', default: null })
    // tachoCard: boolean;

    @Column("varchar", { name: 'tacho_no', nullable: true, length: 250, default: () => null })
    tachoNo: string | null;

    @Column({ name: 'tacho_issue_date', nullable: true, default: () => null })
    tachoIssueDate: Date | null;

    @Column({ name: 'tacho_expire_date', nullable: true, default: () => null })
    tachoExpireDate: Date | null;

    // @Column({ name: 'cpc_submit', type: 'boolean', default: null })
    // cpcCard: boolean;

    @Column("varchar", { name: 'cpc_no', nullable: true, length: 250, default: () => null })
    cpcCardNo: string | null;

    @Column({ name: 'cpc_issue_date', nullable: true, default: () => null })
    cpcCardIssueDate: Date | null;

    @Column({ name: 'cpc_expire_date', nullable: true, default: () => null })
    cpcCardExpireDate: Date | null;

    // @Column({ name: 'crb_submit', type: 'boolean', default: null })
    // crbCheckCard: boolean;

    @Column("varchar", { name: 'crb_no', nullable: true, length: 250, default: () => null })
    crbCardNo: string | null;

    @Column({ name: 'crb_issue_date', nullable: true, default: () => null })
    crbCardIssueDate: Date | null;

    @Column({ name: 'crb_expire_date', nullable: true, default: () => null })
    crbCardExpireDate: Date | null;

    // @Column({ name: 'additional_doc_submit', type: 'boolean', default: null })
    // additionalDocs: boolean;

    @Column({ name: 'status', type: 'boolean', default: true })
    status: boolean;

    @ManyToOne(() => PaymentFrequency, paymentFrequency => paymentFrequency.employee)
    @JoinColumn({ name: 'payment_frequency' })
    paymentFrequency: PaymentFrequency;

    @ManyToOne(() => Bank, bank => bank.employee)
    @JoinColumn({ name: 'bank_id' })
    bankName: Bank;

    @Column("varchar", { name: 'bank_account_name', nullable: true, length: 250, default: () => null })
    bankAccountName: string | null;

    @Column("varchar", { name: 'bank_account_no', nullable: true, length: 250, default: () => null })
    bankAccountNo: string | null;

    // @Column("varchar", { nullable: true, length: 250, default: () => null })
    // bankSortCode: string | null;

    @Column("varchar", { name: 'additional_details', nullable: true, length: 250, default: () => null })
    additionalDetails: string | null;

    @Column({ name: 'leave_date', nullable: true, default: () => null })
    leaveDate: Date | null;

    // @Column({ name: 'former', type: 'boolean', default: false })
    // former: boolean;

    // @ManyToOne(() => User, user => user.empAddedByuser)
    // @JoinColumn({ name: 'added_by' })
    // addedBy: User;

    @OneToMany(() => EmployeeDataHistory, empDataHistory => empDataHistory.employee, { cascade: true })
    editHistory: EmployeeDataHistory[];

    @Column({ name: 'active', type: 'boolean', default: false })
    active: boolean;

    @ManyToMany(() => DrivingLicenceCategory, category => category.empDlCategory, { cascade: true })
    @JoinTable()
    drivingLicenceCategory: DrivingLicenceCategory[];

    @Column("timestamp", { name: 'created_at', default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @ManyToOne(() => User, user => user.empInfoCreatedUser)
    @JoinColumn({ name: 'created_by' })
    created_by: User;

    @Column("timestamp", { name: 'updated_at', default: () => null })
    updated_at: Date;    

    @ManyToOne(() => User, user => user.empInfoUpdatedUser)
    @JoinColumn({ name: 'updated_by' })
    updated_by: User;

    @Column("timestamp", { name: "start_date", default: () => "CURRENT_TIMESTAMP" })
    startDate: Date;

    @Column("timestamp", { name: "end_date", default: null })
    endDate: Date;

    @ManyToOne(() => Employee, employee => employee.linkedEmployee)
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;
}

@Entity('employee_payroll_info')
export class EmployeePayrollInfo {
    @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
    id: number;

    @Column({
        type: 'enum',
        enum: salaryType,
        default: null,
        name: 'salary_type',
        nullable: true,
    })
    salaryType: salaryType | null;

    @Column("int", { name: 'salary_rate', nullable: true, default: () => null })
    slryRate: number;

    @Column("int", { name: 'work_hours_per_week', nullable: true, default: () => null })
    workHoursPerWeek: number;    

    @Column("int", { name: 'shift_hours_per_day', nullable: true, default: () => null })
    shiftHoursPerDay: number;

    @Column("int", { name: 'work_days_per_week', nullable: true, default: () => null })
    workDaysPerWeek: number;

    @Column("int", { name: 'annual_salary', nullable: true, default: () => null })
    annualSalary: number;

    @Column("int", { name: 'salary_weekly', nullable: true, default: () => null })
    slryWeekly: number;

    @Column({
        type: 'enum',
        enum: salaryOtType,
        default: null,
        name: 'salary_ot_type',
        nullable: true,
    })
    slryOtType: salaryOtType | null;

    @Column("int", { name: 'salary_ot_rate', nullable: true, default: () => null })
    slryOtRate: number;

    @Column("int", { name: 'salary_holiday_rate', nullable: true, default: () => null })
    slryHolidayRate: number;

    @Column({
        type: 'enum',
        enum: salarySickType,
        default: null,
        name: 'salary_sick_type',
        nullable: true,
    })
    slrySickType: salarySickType | null;

    @Column("int", { name: 'salary_sick_rate', nullable: true, default: () => null })
    slrySickRate: number;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @ManyToOne(() => User, user => user.empCreatedUser)
    @JoinColumn({ name: 'created_by' })
    created_by: User;

    @Column("timestamp", { default: () => null })
    updated_at: Date;    

    @ManyToOne(() => User, user => user.empUpdatedUser)
    @JoinColumn({ name: 'updated_by' })
    updated_by: User;

    @Column("timestamp", { name: "start_date", default: () => "CURRENT_TIMESTAMP" })
    startDate: Date;

    @Column("timestamp", { name: "end_date", default: null })
    endDate: Date;

    @ManyToOne(() => Employee, employee => employee.linkedEmployee)
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;
}
