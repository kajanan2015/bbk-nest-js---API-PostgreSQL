import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { Createpackage } from 'src/createpackage/createpackage.entity';
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
}
