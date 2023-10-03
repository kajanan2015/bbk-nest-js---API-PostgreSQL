import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { DefectCasesResult } from 'src/defect-cases-result/defect-cases-result.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';
@Entity()
export class DefectTrip {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column("timestamp", { name: "submitDate", default: () => "CURRENT_TIMESTAMP" })
    submitdate: Date;

    @Column("int",{nullable:true,default:null})
    tripId:number;

    @Column("int",{nullable:true,default:null})
    driverId:number;

    // @Column("int",{nullable:true,default:null})
    // vehicleId:number;

    @Column("varchar",{nullable:true,default:null})
    vehicleRegNo:string;
    
    @Column("varchar",{nullable:true,default:null})
    vehicleRegPhoto:string;

    @Column("varchar",{nullable:true,default:null})
    odometerReading:string;
    
    @Column("varchar",{nullable:true,default:null})
    place:string;

    @Column("varchar",{nullable:true,default:null})
    defectNote:string;
    
    @Column("int",{nullable:true,default:null})
    nilDefect:number;

    @Column({ type: 'boolean', default:true})
    status: Boolean;


    @OneToMany(() => DefectCasesResult, defectcaseresult => defectcaseresult.defecttrip, { cascade: true })
    defectCaseResults: DefectCasesResult[];

    @ManyToOne(() => Vehicle, vehicle => vehicle.vehicledefecttrip)
    @JoinColumn()
    vehicle: Vehicle;


}
