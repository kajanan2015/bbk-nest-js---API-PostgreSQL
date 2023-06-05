import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { EmployeeType } from './employee_type/employee-type.entity';
import { EmpDesignation } from './designation/employee-designation.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { Gender } from './gender/gender.entity';
import { MaritalStatus } from './marital_status/maritalStatus.entity';
import { EmployeeDocument } from 'src/employee-document/employee-document.entity';
import { DrivingLicenceType } from './driving_licence_type/driving_licence_type.entity';
import { PaymentFrequency } from './payment_frequency/payment_frequency.entity';
import { BankName } from './bank_name/bank_name.entity';
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

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    profilePic: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
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

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    addressCountry: string | null;

    @Column("varchar", { nullable: true, default: null })
    empProvidedForm: string | null;

    @Column({ nullable: true, default: () => null })
    dateofJoined: Date | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    niNo: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    totalHolidays: string | null;

    @Column({ type: 'boolean', default: true })
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

    @ManyToOne(() => BankName, bankName => bankName.employee)
    @JoinColumn({ name: 'bankName' })
    bankName: BankName
    ;
}
