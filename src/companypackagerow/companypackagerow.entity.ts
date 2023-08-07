
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

    

    
}
