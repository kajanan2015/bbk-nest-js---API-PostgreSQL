import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CompaniesEntity } from 'src/companies/companies.entity';
export class DefectTrip {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column("timestamp", { name: "submitDate", default: () => "CURRENT_TIMESTAMP" })
    submitdate: Date;

    @Column("int",{nullable:true})
    driverId:number;

    @Column("int",{nullable:true})
    tripId:number;

    @Column("int",{nullable:true})
    questionId:number;
    
    @Column("int",{nullable:true})
    resultQuestion:number;
    
    @Column("varchar",{nullable:true})
    note:string;
    
    @Column({ type: 'boolean', default:true})
    status: Boolean;
}
