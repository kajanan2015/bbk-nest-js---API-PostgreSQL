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
import { country } from 'src/companies/country.entity';
import { EmployeeDataHistory } from 'src/employee-data-history/employee-data-history.entity';
import { DrivingLicenceCategory } from './driving_licence_category/driving_licence_category.entity';
@Entity()
export class EmployeeModule {
    @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
    id: number;

    @Column("varchar", { nullable: true, default: () => null })
    employeeId: string;

    @ManyToOne(() => EmployeeType, employeetype => employeetype.employeType)
    @JoinColumn({ name: 'employeeType' })
    employeeType: EmployeeType;

    @ManyToOne(() => EmpDesignation, designation => designation.designation)
    @JoinColumn({ name: 'employeeDesignation' })
    designation: EmpDesignation;

    @ManyToOne(() => CompaniesEntity, company => company.employedetails)
    @JoinColumn({ name: 'companyId' })
    company: CompaniesEntity;

    @Column("varchar", { nullable: true, default: () => null })
    firstName: string | null;

    @Column("varchar", { nullable: true, default: () => null })
    lastName: string | null;

    @Column({ nullable: true, default: () => null })
    dob: Date | null;

    @ManyToOne(() => Gender, gender => gender.employee)
    @JoinColumn({ name: 'gender' })
    gender: Gender;

    @ManyToOne(() => MaritalStatus, maritalStatus => maritalStatus.employee)
    @JoinColumn({ name: 'maritalStatus' })
    maritalStatus: MaritalStatus;

    @Column("varchar", { nullable: true, length: 500, default: () => null })
    profilePic: string | null;

    @Column("varchar", { nullable: true, length: 500, default: () => null })
    profilePicThumb: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    mobilePhone: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    homePhone: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    email: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    emergContactName: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    emergeContactNo: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    addressName: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    addressStreet: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    addressCity: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    addressState: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    addressPostal: string | null;

    @ManyToOne(() => country, country => country.employeeCountry)
    @JoinColumn({ name: 'addressCountry' })
    addressCountry: country;

    @Column("varchar", { nullable: true, default: null })
    empProvidedForm: string | null;

    @Column({ nullable: true, default: () => null })
    dateofJoined: Date | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    niNo: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    totalHolidays: string | null;

    @Column({ type: 'boolean', default: null })
    isNonNative: boolean;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    officialDocType: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    officialDocNo: string | null;

    @Column({ nullable: true, default: () => null })
    officialDocIssueDate: Date | null;

    @Column({ nullable: true, default: () => null })
    officialDocExpireDate: Date | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    visaType: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    visaNo: string | null;

    @Column({ nullable: true, default: () => null })
    visaIssueDate: Date | null;

    @Column({ nullable: true, default: () => null })
    visaExpireDate: Date | null;

    @Column({ type: 'boolean', default: false})
    contract: boolean;

    @Column({ type: 'boolean', default: false})
    offerLetter: boolean;

    @Column({ type: 'boolean', default: false})
    referenceCheck: boolean;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    refName: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    refCompanyName: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    refContact: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    refEmail: string | null;

    @Column({ nullable: true, default: () => null })
    refGivenDate: Date | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    refCompAddressName: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    refCompAddressStreet: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    refCompAddressCity: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    refCompAddressState: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    refCompAddressPostal: string | null;

    // @Column("varchar", { nullable: true, length: 250, default: () => null })
    // refCompAddressCountry: string | null;

    @ManyToOne(() => country, refCompAddressCountry => refCompAddressCountry.refCompAddressCountry)
    @JoinColumn({ name: 'refCompAddressCountry' })
    refCompAddressCountry: country;

    @Column({ type: 'boolean', default: false})
    drivingLicence: boolean;

    // @Column("varchar", { nullable: true, length: 250, default: () => null })
    // drivingLicenceType: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    drivingLicenceNo: string | null;

    // @Column("varchar", { nullable: true, length: 250, default: () => null })
    // drivingLicenceCategory: string | null;

    @Column({ nullable: true, default: () => null })
    drivingLicenceIssue: Date | null;

    @Column({ nullable: true, default: () => null })
    drivingLicenceExpire: Date | null;

    @Column({ nullable: true, default: () => null })
    drivingLicenceCatDIssue: Date | null;

    @Column({ nullable: true, default: () => null })
    drivingLicenceCatDExpire: Date | null;
    
    @Column({ type: 'boolean', default: false})
    tachoCard: boolean;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    tachoNo: string | null;

    @Column({ nullable: true, default: () => null })
    tachoIssueDate: Date | null;

    @Column({ nullable: true, default: () => null })
    tachoExpireDate: Date | null;

    @Column({ type: 'boolean', default: false })
    cpcCard: boolean;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    cpcCardNo: string | null;

    @Column({ nullable: true, default: () => null })
    cpcCardIssueDate: Date | null;

    @Column({ nullable: true, default: () => null })
    cpcCardExpireDate: Date | null;

    @Column({ type: 'boolean', default: false })
    crbCheckCard: boolean;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    crbCardNo: string | null;

    @Column({ nullable: true, default: () => null })
    crbCardIssueDate: Date | null;

    @Column({ nullable: true, default: () => null })
    crbCardExpireDate: Date | null;

    @Column({ type: 'boolean', default: false})
    additionalDocs: boolean;

    @Column({ type: 'boolean', default: true })
    status: boolean;

    @OneToMany(() => EmployeeDocument, empDocuments => empDocuments.empid,{ cascade: true })
    documents: EmployeeDocument[];

    @ManyToOne(() => DrivingLicenceType, drivingLicenceType => drivingLicenceType.employee)
    @JoinColumn({ name: 'drivingLicenceType' })
    drivingLicenceType: DrivingLicenceType;

    @ManyToOne(() => PaymentFrequency, paymentFrequency => paymentFrequency.employee)
    @JoinColumn({ name: 'paymentFrequency' })
    paymentFrequency: PaymentFrequency;

    @ManyToOne(() => Bank, bankName => bankName.employee)
    @JoinColumn({ name: 'bankName' })
    bankName: Bank;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    bankAccountName: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    bankAccountNo: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    bankSortCode: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    additionalDetails: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    salaryType: string | null;

    @Column("int", { nullable: true, default: () => null })
    slryRatePerHour: number;

    @Column("int", { nullable: true, default: () => null })
    workHoursPerWeek: number;

    @Column("int", { nullable: true, default: () => null })
    slryRatePerDay: number;

    @Column("int", { nullable: true, default: () => null })
    shiftHoursPerDay: number;

    @Column("int", { nullable: true, default: () => null })
    workDaysPerWeek: number;

    @Column("int", { nullable: true, default: () => null })
    annualSalary: number;

    @Column("int", { nullable: true, default: () => null })
    slryWeekly: number;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    slryOtType: string | null;

    @Column("int", { nullable: true, default: () => null })
    slryOtRate: number;

    @Column("int", { nullable: true, default: () => null })
    slryHolidayRate: number;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    slrySickType: string | null;

    @Column("int", { nullable: true, default: () => null })
    slrySickRate: number;

    @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
    createdat: Date;

    @ManyToOne(() => User, user => user.empAddedByuser)
    @JoinColumn({ name: 'addedBy' })
    addedBy: User;

    @OneToMany(() => EmployeeDataHistory, empDataHistory => empDataHistory.employee,{ cascade: true })
    editHistory: EmployeeDataHistory[];


    @Column({ type: 'boolean', default: false })
    active: boolean;
    
    @ManyToMany(() => DrivingLicenceCategory, category => category.empDlCategory, { cascade: true })
    @JoinTable()
    drivingLicenceCategory: DrivingLicenceCategory[];

}
