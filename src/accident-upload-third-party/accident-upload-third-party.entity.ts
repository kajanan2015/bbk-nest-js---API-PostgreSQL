import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AccidentUpload } from 'src/accident-upload/accident-upload.entity';
@Entity()
export class AccidentUploadThirdParty {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column("timestamp", { name: "submitDate", default: () => "CURRENT_TIMESTAMP" })
    submitdate: Date;

    @Column("varchar",{nullable:true,default:null})
    namePersonCompany:string;

    @Column("varchar",{nullable:true,default:null})
    personEmail:string;

    @Column("varchar",{nullable:true,default:null})
    personContactNumber:string;


    @Column("varchar",{nullable:true,default:null})
    vehicleRegNo:string;
    
    @Column("varchar",{nullable:true,default:null})
    vehicleRegPhoto:string;

    @Column("varchar",{nullable:true,default:null})
    insuaranceCompany:string;

    @Column("varchar",{nullable:true,default:null})
    insuarancePolicy:string;

    @Column("varchar",{nullable:true,default:null})
    insuaranceCompanyEmail:string;

    @Column("varchar",{nullable:true,default:null})
    insuaranceCompanyContactNumber:string;

    @Column("timestamp", { name: "createdat", default: () => "CURRENT_TIMESTAMP" })
    createdat: Date;

    @ManyToOne(() => AccidentUpload, accidentUpload => accidentUpload.accidentThirdParty)
    @JoinColumn({ name: 'accidentId' })
    accidentUpload: AccidentUpload;
}
