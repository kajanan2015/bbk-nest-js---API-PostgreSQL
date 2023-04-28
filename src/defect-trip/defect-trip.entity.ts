import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { DefectCasesResult } from 'src/defect-cases-result/defect-cases-result.entity';
@Entity()
export class DefectTrip {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column("timestamp", { name: "submitDate", default: () => "CURRENT_TIMESTAMP" })
    submitdate: Date;

    @Column("int",{nullable:true})
    tripId:number;

    @Column("varchar",{nullable:true})
    vehicleRegNo:string;
    
    @Column("varchar",{nullable:true})
    vehicleRegPhoto:string;

    @Column("varchar",{nullable:true})
    odometerReading:string;
    
    @Column("varchar",{nullable:true})
    place:string;

    @Column("varchar",{nullable:true})
    defectNote:string;
    
    @Column("int",{nullable:true})
    nilDefect:number;

    @Column({ type: 'boolean', default:true})
    status: Boolean;


    @OneToMany(() => DefectCasesResult, defectcaseresult => defectcaseresult.defecttrip, { cascade: true })
    defectCaseResults: DefectCasesResult[];


}
