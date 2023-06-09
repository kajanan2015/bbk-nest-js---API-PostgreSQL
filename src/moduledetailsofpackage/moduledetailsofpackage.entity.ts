import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { Createpackage } from 'src/createpackage/createpackage.entity';
import { CompaniesEntity } from 'src/companies/companies.entity';
@Entity()
export class Moduledetailsofpackage {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    NoOfRecords: number;
  
    @Column()
    CostPerRecord: number;
  
    @Column()
    PackagePrice: number;

    @ManyToOne(() => Createmodule, module => module.moduledetails)
    @JoinColumn()
    module: Createmodule;

    @ManyToOne(() => Createpackage, packages => packages.packagedetails)
    @JoinColumn()
    packages: Createpackage;

    @ManyToMany(() => CompaniesEntity, module => module.package)
    @JoinTable()
    company: CompaniesEntity[];
}
