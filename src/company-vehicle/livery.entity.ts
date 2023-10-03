import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { companyvehicledata } from "./companyvehicle.entity";

@Entity()
export class liveryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  livery: string;

  @Column({ type: 'boolean', default:true})
  status: boolean;

  @OneToMany(()=>companyvehicledata, vehicledetails => vehicledetails.livery,{cascade:true})
vehicledetails:companyvehicledata[]
}
