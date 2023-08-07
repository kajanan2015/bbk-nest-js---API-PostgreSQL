import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "src/vehicle/vehicle.entity";
import { CompaniesEntity } from "src/companies/companies.entity";
import { companyvehicledata } from "src/company-vehicle/companyvehicle.entity";

@Entity()
export class VehicleTypeEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { name: "type_name", nullable: false, length: 30 })
  typeName: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ name: "seat_capacity", type: 'int', nullable: true })
  seatCapacity: number;

  @Column("timestamp", { name: "created_at", default: () => "CURRENT_TIMESTAMP" })
  createdat: Date;

  @Column("timestamp", { name: "updated_at", default: () => "CURRENT_TIMESTAMP" })
  updatedat: Date;

  @Column("int", { nullable: true, default: () => null })
  created_by: number;

  @Column("int", { nullable: true, default: () => null })
  updated_by: number

  @Column("timestamp", { name: "start_date", default: () => "CURRENT_TIMESTAMP" })
  start_date: Date;

  @Column("timestamp", { name: "end_date", default: () => "CURRENT_TIMESTAMP" })
  end_date: Date;


  @ManyToOne(() => CompaniesEntity, company => company.vehicleentity)
  @JoinColumn({ name: 'company_id' })
  company: CompaniesEntity;

  @OneToMany(() => Vehicle, vehicle => vehicle.vehicletype, { cascade: true })
  vehicle: Vehicle[]

  @OneToMany(() => companyvehicledata, vehicledetails => vehicledetails.company, ({ cascade: true }))
  vehicledetails: companyvehicledata[];

}
