
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CompaniesEntity } from 'src/companies/companies.entity';

@Entity()
export class DefectCasesResult {
    @PrimaryGeneratedColumn()
id:number;

@Column("int",{nullable:true})
questionId:number;

@Column("int",{nullable:true})
resultQuestion:number;

@Column("varchar",{nullable:true})
note:string;

@Column({ type: 'boolean', default:true})
status: Boolean;
}

