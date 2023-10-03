import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { companyvehicledata } from "./companyvehicle.entity";


@Entity()
export class fuelTypeEntity {
@PrimaryGeneratedColumn()
id:number;

@Column("varchar", { nullable: true, length: 30, default: () => null })
fuelType: string;

@Column({ type: 'boolean', default:true})
status: boolean;

@OneToMany(()=>companyvehicledata, vehicledetails => vehicledetails.fuelType,{cascade:true})
vehicledetails:companyvehicledata[]
}