import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AccidentUpload } from 'src/accident-upload/accident-upload.entity';

@Entity()
export class AccidentUploadImage {
    @PrimaryGeneratedColumn()
    id:number;

    @Column("varchar",{nullable:true})
    patheImage:String;

    @Column({ type: 'boolean', default:true})
    status: Boolean;

    @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
    createdat: Date;

    @ManyToOne(() => AccidentUpload, accidentupload => accidentupload.accidentImages)
    @JoinColumn({ name: 'accidentId' })
    accidentUpload: AccidentUpload;
}
