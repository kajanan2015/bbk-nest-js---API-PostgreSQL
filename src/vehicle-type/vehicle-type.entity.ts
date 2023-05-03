import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "src/vehicle/vehicle.entity";


@Entity()
export class VehicleTypeEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column("varchar", { nullable: false , length: 30 })
    typeName: string;

    @Column({ type: 'boolean', default:true})
  status: boolean;

    @Column( {type:'int', nullable: true })
  seatCapacity: number;

  @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date;

  @Column("timestamp", { name: "updatedat", default: () => "CURRENT_TIMESTAMP" })
  updatedat: Date;
   
  @OneToMany(()=>Vehicle, vehicle => vehicle.vehicletype,{cascade:true})
  vehicle:Vehicle[]

}
