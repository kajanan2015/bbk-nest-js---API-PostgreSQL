import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AccidentUploadImage } from 'src/accident-upload-image/accident-upload-image.entity';
import { AccidentUploadThirdParty } from 'src/accident-upload-third-party/accident-upload-third-party.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';



@Entity()
export class AccidentUpload {
@PrimaryGeneratedColumn()
id:number;

@Column("timestamp", { name: "dateTime", default: () => "CURRENT_TIMESTAMP" })
dateTime: Date;

@Column("int",{nullable:true,default:null})
tripId:number;

@Column("varchar",{length:250,nullable:true,default:null})
location:String;

@Column({ type: 'int', default:'1'})
withnessStatement: number;

@Column("varchar",{length:500,nullable:true,default:null})
accidentDescription:String;

@Column({ type: 'boolean', default:true})
status: Boolean;

@Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
createdat: Date;

@OneToMany(() => AccidentUploadImage, accidentimage => accidentimage.accidentUpload,{ cascade: true })
accidentImages: AccidentUploadImage[];

@OneToMany(() => AccidentUploadThirdParty, accidentthirdparty => accidentthirdparty.accidentUpload,{ cascade: true })
accidentThirdParty: AccidentUploadThirdParty[];

@ManyToOne(() => Vehicle, vehicle => vehicle.vehicleaccident)
@JoinColumn()
vehicle: Vehicle;

}
