import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { companyvehicledata } from "./companyvehicle.entity";

@Entity()
export class defaultBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  default_base: string;
  
  @Column({ type: 'boolean', default:true})
  status: boolean;

  @OneToMany(()=>companyvehicledata, vehicledetails => vehicledetails.defaultBaseDrop,{cascade:true})
vehicledetails:companyvehicledata[]
}
