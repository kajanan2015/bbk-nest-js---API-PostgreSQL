
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CompaniesEntity } from 'src/companies/companies.entity';
import { DefectTrip } from 'src/defect-trip/defect-trip.entity';
import { defectCases } from 'src/defect-cases/defect-case.entity';
@Entity()
export class DefectCasesResult {
    @PrimaryGeneratedColumn()
id:number;

// @Column("int",{nullable:true})
// questionId:number;

@Column("int",{nullable:true})
resultQuestion:number;

@Column("varchar",{nullable:true})
note:string;

@Column({ type: 'boolean', default:true})
status: Boolean;

@ManyToOne(() => DefectTrip, defecttrip => defecttrip.defectCaseResults)
@JoinColumn()
defecttrip: DefectTrip;


@ManyToOne(() => defectCases, question => question.defectCasesResults)
@JoinColumn({ name: 'questionId' })
  question: defectCases;
}
