import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AccidentUpload } from 'src/accident-upload/accident-upload.entity';
@Entity()
export class AccidentUploadThirdParty {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column("timestamp", { name: "submitDate", default: () => "CURRENT_TIMESTAMP" })
    submitdate: Date;

    @Column("varchar",{nullable:true})
    namePersonCompany:string;

    @Column("varchar",{nullable:true})
    vehicleRegNo:string;
    
    @Column("varchar",{nullable:true})
    vehicleRegPhoto:string;

    @Column("varchar",{nullable:true})
    insuaranceCompany:string;

    @Column("varchar",{nullable:true})
    insuarancePolicy:string;

    @ManyToOne(() => AccidentUpload, accidentUpload => accidentUpload.accidentThirdParty)
    @JoinColumn({ name: 'accidentId' })
    accidentUpload: AccidentUpload;
}
