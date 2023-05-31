import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { EmployeeType } from './employee_type/employee-type.entity';
import { EmpDesignation } from './designation/employee-designation.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { Gender } from './gender/gender.entity';
import { MaritalStatus } from './marital_status/maritalStatus.entity';
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

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    empProvidedCopy: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    empProvidedCopyThumb: string | null;

    @Column({ nullable: true, default: null })
    isNative: boolean | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    docType: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    passNo: string | null;

    @Column({ nullable: true, default: () => null })
    passIssueDate: Date | null;

    @Column({ nullable: true, default: () => null })
    passExpireDate: Date | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    officialDocFile: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    officialDocFileThumb: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    visaType: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    visaNo: string | null;

    @Column({ nullable: true, default: () => null })
    visaIssueDate: Date | null;

    @Column({ nullable: true, default: () => null })
    visaExpireDate: Date | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    visaCopy: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    visaCopyThumb: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    passImg: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    passImgThumb: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    bcNo: string | null;

    @Column({ nullable: true, default: () => null })
    bcIssueDate: Date | null;

    @Column({ nullable: true, default: () => null })
    bcExpireDate: Date | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    bcImg: string | null;

    @Column("varchar", { nullable: true, length: 250, default: () => null })
    bcImgThumb: string | null;

}
