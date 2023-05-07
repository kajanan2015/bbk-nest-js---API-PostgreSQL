import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AccidentUploadImage } from 'src/accident-upload-image/accident-upload-image.entity';
import { AccidentUploadThirdParty } from 'src/accident-upload-third-party/accident-upload-third-party.entity';
@Entity()
export class AccidentUpload {
@PrimaryGeneratedColumn()
id:number;

@Column("timestamp", { name: "dateTime", default: () => "CURRENT_TIMESTAMP" })
dateTime: Date;

@Column("varchar",{length:250,nullable:true,default:null})
location:String;

@Column({ type: 'boolean', default:true})
withnessStatement: Boolean;

@Column("varchar",{length:500,nullable:true,default:null})
accidentDescription:String;

@Column({ type: 'boolean', default:true})
status: Boolean;

@OneToMany(() => AccidentUploadImage, accidentimage => accidentimage.accidentUpload,{ cascade: true })
accidentImages: AccidentUploadImage[];


@OneToMany(() => AccidentUploadThirdParty, accidentthirdparty => accidentthirdparty.accidentUpload,{ cascade: true })
accidentThirdParty: AccidentUploadThirdParty[];

}
