import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { companyvehicledata } from "./companyvehicle.entity";


@Entity()
export class licenseCategoryEntity {
@PrimaryGeneratedColumn()
id:number;

@Column("varchar", { nullable: true, length: 30, default: () => null })
license_category: string;

@Column({ type: 'boolean', default:true})
status: boolean;

@OneToMany(()=>companyvehicledata, vehicledetails => vehicledetails.licenseDrop,{cascade:true})
vehicledetails:companyvehicledata[]
}