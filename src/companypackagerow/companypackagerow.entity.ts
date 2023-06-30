
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn, JoinTable, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { Moduledetailsofpackage } from 'src/moduledetailsofpackage/moduledetailsofpackage.entity';
@Entity()
export class Companypackagerow {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true ,default: () => null})
    rowcount: number;

    @Column({ nullable: true ,default: () => null})
    availablerowcount: number;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    rowprice: string;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    packageprice: number;

    @Column("timestamp", { name: "assigndate", default: () => "CURRENT_TIMESTAMP" })
    assigndate: Date;

    @Column("timestamp", { nullable:true,name: "enddate", default: null })
    enddate: Date;

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

    @Column("tinyint",{ nullable: true ,default: () => null, comment: ' 1-trial,0-default'})
    trialpackageidentifier: number;

    
}
