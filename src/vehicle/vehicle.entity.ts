import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VehicleTypeEntity } from "src/vehicle-type/vehicle-type.entity";
import { TripEntity } from "src/trip/trip.entity";
import { AccidentUpload } from "src/accident-upload/accident-upload.entity";
@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("varchar", { nullable: true , length: 30 ,default: () => null })
    vehicleName: string;

    @Column("varchar", { nullable: true , length: 30 ,default: () => null })
    vehicleRegNumber: string;

    @Column("varchar", { nullable: true , length: 30 ,default: () => null })
    vehicleCompany: string;

    @Column({ type: 'boolean', default:true})
    status: boolean;

    @ManyToOne(() => VehicleTypeEntity, vehicletype => vehicletype.vehicle)
    @JoinColumn()
    vehicletype: VehicleTypeEntity;

    @OneToMany(()=>TripEntity, trip => trip.vehicle,{cascade:true})
    vehicletrip:TripEntity[]

    @OneToMany(()=>AccidentUpload, accident => accident.vehicle,{cascade:true})
    vehicleaccident:AccidentUpload[]
}
