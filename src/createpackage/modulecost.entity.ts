// relationship-table.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Createpackage } from './createpackage.entity';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { Modulepackagerelationship } from './modulepackagerelationship.entity';
@Entity({ name: 'module_cost' })
export class ModuleCost{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  NoOfRecords: number;

  @Column()
  CostPerRecord: number;

  @Column()
  PackagePrice: number;

  @ManyToOne(() => Createmodule, module => module.costid)
  moduledata: Createmodule;

  @OneToMany(() => Modulepackagerelationship, relationship => relationship.details)
  relationships: Modulepackagerelationship[];

}
