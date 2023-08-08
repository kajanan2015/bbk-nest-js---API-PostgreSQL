import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { VehicleTypeEntity } from "src/vehicle-type/vehicle-type.entity";
import { fuelTypeEntity } from "./fueltype.entity";
import { CompaniesEntity } from "src/companies/companies.entity";
import { defaultBaseEntity } from "./defaulbase.entity";
import { licenseCategoryEntity } from "./licensecategory.entity";
import { liveryEntity } from "./livery.entity";

@Entity("vehicle_data_company")
export class companyvehicledata {
  //company vehicle details
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  vehicleType: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  VehicleID: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  RegistrationMark: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  Seats: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  FleetNo: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  MobileNo: string;

  @Column({ type: "boolean", default: true })
  automatic: boolean;

  @Column({ type: "boolean", default: true })
  suspend: boolean;

  @Column({ type: "boolean", default: true })
  subcontractor: boolean;

  @Column({ type: "boolean", default: true })
  schedule: boolean;

  //vehicle owner contact details
  @Column("varchar", { nullable: true, length: 30, default: () => null })
  mobilePhone: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  homePhone: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  email: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  emergContactName: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  emergeContactNo: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  addressName: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  addressStreet: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  addressCity: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  addressCountry: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  addressState: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  addressPostal: string;

  // vehicle official details
  @Column("timestamp", { nullable: true, default:()=> "CURRENT_TIMESTAMP"})
  FirstRegistered: Date;

  @Column("timestamp", { nullable: true, default:()=> "CURRENT_TIMESTAMP"})
  DatePurchased: Date;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  PurchaseDistance: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  PurchasePrice: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  PurchasedFrom: string;

  @Column("timestamp", { nullable: true, default:()=> "CURRENT_TIMESTAMP"})
  DateSold: Date;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  SaleDistance: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  SalePrice: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  SoldTo: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  BodyMake: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  BodyNo: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  ChassisMake: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  ChassisNo: string;

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  EngineMake: string;

  // vehicle other documents

  @Column("varchar", { nullable: true, default: () => null })
  vehicleImg: string;

  @Column("varchar", { nullable: true, default: () => null })
  filesArray: string;

  @Column({ type: "boolean", default: true })
  facilityCheck: boolean;

  @Column({ type: "boolean", default: true })
  facilityACheck: boolean;

  @Column({ type: "boolean", default: true })
  facilityBCheck: boolean;

  @Column({ type: "boolean", default: true })
  facilityCCheck: boolean;

  @Column({ type: "boolean", default: true })
  facilityDCheck: boolean;

  @Column({ type: "boolean", default: true })
  facilityECheck: boolean;

  @Column({ type: "boolean", default: true })
  facilityFCheck: boolean;

  @Column({ type: "boolean", default: true })
  facilityGCheck: boolean;

  @Column({ type: "boolean", default: true })
  facilityHCheck: boolean;

  @Column({ type: "boolean", default: true })
  facilityICheck: boolean;

  @Column({ type: "boolean", default: true })
  facilityJCheck: boolean;

  @Column({ type: "boolean", default: true })
  facilityKCheck: boolean;

  @Column({ type: "boolean", default: true })
  facilityLCheck: boolean;

  @Column({ type: "boolean", default: true })
  facilityMCheck: boolean;

  @Column({ type: "boolean", default: true })
  facilityNCheck: boolean;

  @Column({ type: "boolean", default: true })
  facilityOCheck: boolean;

  // additional details

  @Column("varchar", { nullable: true, length: 30, default: () => null })
  additionalDetails: string;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdat: Date;

  @Column("timestamp", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedat: Date;

  @Column("int", { nullable: true, default: () => null })
  created_by: number;

  @Column("int", { nullable: true, default: () => null })
  updated_by: number;

  @Column("timestamp", {
    name: "start_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  start_date: Date;

  @Column("timestamp", { name: "end_date", default: () => "CURRENT_TIMESTAMP" })
  end_date: Date;

  @ManyToOne(() => fuelTypeEntity, (fuelDrop) => fuelDrop.vehicledetails)
  @JoinColumn()
  fuelType: fuelTypeEntity;

  @ManyToOne(() => liveryEntity, (liveryDrop) => liveryDrop.vehicledetails)
  @JoinColumn()
  livery: liveryEntity;

  @ManyToOne(() => licenseCategoryEntity, (licenseDrop) => licenseDrop.vehicledetails)
  @JoinColumn()
  licenseCategory: licenseCategoryEntity;

  @ManyToOne(() => defaultBaseEntity, (defaultBaseDrop) => defaultBaseDrop.vehicledetails)
  @JoinColumn()
  defaultBase: defaultBaseEntity;

  @ManyToOne(() => CompaniesEntity, (company) => company.vehicledetails)
  @JoinColumn()
  company: CompaniesEntity;

  @ManyToOne(() => VehicleTypeEntity, (vehicle_Type) => vehicle_Type.vehicledetails)
  @JoinColumn()
  vehicle_Type: VehicleTypeEntity;

}
