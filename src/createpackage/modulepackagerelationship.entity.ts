// relationship-table.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Createpackage } from './createpackage.entity';
import { Createmodule } from 'src/createmodule/createmodule.entity';
import { ModuleCost } from './modulecost.entity';
@Entity({ name: 'module_pkg_relationship' })
export class Modulepackagerelationship{
  @PrimaryGeneratedColumn({ name: 'relationid' })
  relationid: number;


  @ManyToOne(() => Createpackage, tableA => tableA.modules)
  package: Createpackage;

  @ManyToOne(() => ModuleCost, tableC => tableC.relationships)
  details: ModuleCost;
}
