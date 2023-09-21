import { CompaniesEntity } from "src/companies/companies.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Paymenttype {
    IER = 'Individual Emplpyee Rate',
    CFR = 'Companys Fixed Rate'
  }

  export enum Salarytype {
    AWS = 'Add with salary',
    NOPAY = 'No pay'
  }

  export enum Jobtypestatus {
    ACTIVE = 'active',
    DEACTIVATE = 'deactivate'
  }

@Entity("company-wise-job-type")
export class JobType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: true , length: 30 ,default: () => null })
    jobTypeName: string;

    @Column("varchar", { nullable: true , length: 30 ,default: () => null })
    shortCode: string;

    @Column("varchar", { nullable: true , length: 30 ,default: () => null })
    pickColor: string;

    @Column("enum", { name: "payment_type", enum: Paymenttype, default: Paymenttype.IER, comment: "Individual Emplpyee Rate/Company's Fixed Rate" })
    paymenttype: Paymenttype;

    @Column("enum", { name: "salary_type", enum: Salarytype, default: Salarytype.AWS, comment: "Add with salary/No pay" })
    salarytype: Salarytype;

    @Column("varchar", { nullable: true , length: 30 ,default: () => null })
    setRatePerHour: string;

    @Column('enum', { name: "jobtype_status", enum: Jobtypestatus, default: Jobtypestatus.ACTIVE, comment: 'active/decativate' })
    jobtypestatus: Jobtypestatus;

    @ManyToOne(() => User, user => user.jobtypeCreatedBy)
    @JoinColumn({ name: 'created_by' })
    created_by: User;

    @Column("timestamp", { name: "created_at", default: null })
    created_at: Date;

    @ManyToOne(() => User, user => user.jobtypeUpdatedBy)
    @JoinColumn({ name: 'updated_by' })
    updated_by: User;

    @Column("timestamp", { name: "updated_at", default: null })
    updated_at: Date;

    @ManyToOne(() => CompaniesEntity, company => company.jobTypeName)
    @JoinColumn()
    company: CompaniesEntity;
}
