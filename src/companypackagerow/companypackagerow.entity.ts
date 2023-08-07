
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn, JoinTable, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { Moduledetailsofpackage } from 'src/moduledetailsofpackage/moduledetailsofpackage.entity';


export enum AssignPackageType {
    TRIAL = 'trial package',
    FIXED = 'fixed package',
    DEFAULT= 'no package'
  }


@Entity()
export class Companypackagerow {
    @PrimaryGeneratedColumn({name: "assign_package_id"})
    id: number;

    @Column({ nullable: true ,default: () => null})
    rowcount: number;

    @Column({ nullable: true ,default: () => null})
    availablerowcount: number;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    rowprice: string;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    packageprice: number;

    @Column("timestamp", { name: "assign_date", default: () => "CURRENT_TIMESTAMP" })
    assigndate: Date;

    @Column("timestamp", { nullable:true,name: "valid_date", default: null })
    enddate: Date;
  
    @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
    cre

    @Column("enum", { name: "package_identifier", enum: AssignPackageType, default: AssignPackageType.DEFAULT, comment: 'Trial/assign/default' })
    trialpackageidentifier: AssignPackageType;
    
    @ManyToOne(() => User, user => user.packageassignuser)
    @JoinColumn({ name: 'assigned_by' })
    created_by: User;

    @ManyToOne(() => Createmodule, module => module.companypackagerow)
    @JoinColumn()
    module: Createmodule;

    @ManyToOne(() => Createpackage, packages => packages.companypackagerow)
    @JoinColumn()
    packages: Createpackage;

    @ManyToOne(() => CompaniesEntity, company => company.companypackagerow)
    @JoinColumn()
    company: CompaniesEntity;

    @ManyToOne(() => Moduledetailsofpackage, details => details.companypackagerow)
    @JoinColumn()
    moduledetails: Moduledetailsofpackage;

    @OneToMany(() => Companypackageassignhistory, assignpkghistory => assignpkghistory.companypackagerow, ({ cascade: true }))
    assignpackagehistorydata: Companypackageassignhistory[];

    
}

export enum AssignPackageHistoryType{
    INITIAL='initial data'
}

@Entity('company_assign_package_history')
export class Companypackageassignhistory{
    @PrimaryGeneratedColumn({ type: "int", name: "company_assign_package_history_id", unsigned: true })
    id: number;
  
    @Column("enum", { name: "history_data_type", enum: AssignPackageHistoryType, default: AssignPackageHistoryType.INITIAL, comment: "company assign package initial data" })
    history_data_type: AssignPackageHistoryType;
  
    @Column({ type: "text", name: "history_data" })
    history_data: String;
  
    @ManyToOne(() => User, user => user.companyassignpackagehistorycreate)
    @JoinColumn({ name: 'created_by' })
    created_by: User;
  
    @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;
  
    @ManyToOne(() => User, user => user.companyassignpackagehistoryupdate)
    @JoinColumn({ name: 'updated_by' })
    updated_by: User;
  
  
    @Column("timestamp", { name: "updated_at", nullable: true, default: () => null })
    updated_at: Date;
  
    @ManyToOne(() => CompaniesEntity, company => company.assignpkghistory)
    @JoinColumn({ name: 'company_id' })
    company: CompaniesEntity;

    @ManyToOne(() => Companypackagerow, assignrow => assignrow.assignpackagehistorydata)
    @JoinColumn({ name: 'assignpackagerow_id' })
    companypackagerow: Companypackagerow;
  
    @Column('timestamp', { nullable: true, name: 'start_date', default: () => "CURRENT_TIMESTAMP" })
    start_date: Date;
}