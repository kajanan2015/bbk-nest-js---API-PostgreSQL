import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { DefectCasesResult } from 'src/defect-cases-result/defect-cases-result.entity';
@Entity()
export class defectCases {
@PrimaryGeneratedColumn()
id:number;

@Column("varchar",{nullable:true})
question:string;

@Column({ type: 'boolean', default:true})
status: Boolean;

@OneToMany(() => DefectCasesResult, defectCasesResult => defectCasesResult.question,{ cascade: true })
defectCasesResults: DefectCasesResult[];
}
